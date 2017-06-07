import Point from "./point"
import {normalize as normalizeRadians, twoPi} from "./radians"

export default function Player(x, y, height, direction) {
  this.x = x
  this.y = y
  this.height = height
  this.direction = direction
}

// Determine the distance to walls the user can see by casting rays of light from the player's
// eyes and figuring out where they intersect with a wall. The `resolution` is the number of rays
// to cast, and `fov` determines how spread apart they will be.
Player.prototype.castRays = function (map, fov, resolution) {
  // If the field of view is 60 degrees and the resolution is 320, there is 60 / 320 degrees
  // between each ray.
  const angleBetweenRays = fov / resolution
  // The player's direction is the center of the screen, and the left edge of the screen is half
  // the field of view to the left. In our coordinate system, angles increase as we turn counter-
  // clockwise, so we add to player's current direction.
  const startAngle = this.direction + fov / 2
  // Generate the angle for each ray starting from the left and sweeping to the right screen edge.
  const rayAngles = new Array(resolution).fill(0).map((_, index) => startAngle - index * angleBetweenRays)
  // Calculate the distance from each ray to the nearest wall.
  return rayAngles.map(angle => this.castRay(map, angle))
}

// Determine the distance a single ray travels before intersecting a wall.
Player.prototype.castRay = function (map, rawAngle) {
  // Ensure that the angle is between 0 and 360 degrees.
  const angle = normalizeRadians(rawAngle)
  // Find the raw distance to the nearest wall.
  const distance = this.findDistance(map, angle)
  // Correct for fishbowl-effect resulting from mixing polar and cartesian coordinates.
  return distance * Math.cos(angle - this.direction)
}

Player.prototype.findDistance = function (map, angle) {
  // Determine if the ray is travelling up/down and left/right.
  const up = angle > 0 && angle < Math.PI
  const right = angle < (twoPi * 0.25) || angle > (twoPi * 0.75)
  // Pre-calculate the slope of the line in our coordinate system from the angle.
  const slope = Math.tan(angle)
  // Really naive algorithm to do this... probably really slow, too.
  const dx = right ? 1 : -1
  const dy = Math.abs(slope) * (up ? -1 : 1)
  let position = new Point(this.x, this.y)
  let gridPosition = position.toGrid(map.height)
  while (map.isWithinBounds(gridPosition)) {
    // Determine if the intersection is with a wall.
    if (map.isWall(gridPosition)) {
      // We have intersected a wall, so return the distance to it.
      return Math.hypot(this.x - position.x, this.y - position.y)
    }
    // We have _not_ intersected a wall, yet. Find the next intersection.
    position = position.add(dx, dy)
    gridPosition = position.toGrid(map.height)
  }
  return Infinity
}
