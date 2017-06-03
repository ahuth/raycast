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
  // the field of view to the left.
  const startAngle = this.direction - fov / 2
  // Generate the angle for each ray starting from the left and sweeping to the right screen edge.
  const rayAngles = new Array(resolution).fill(0).map((_, index) => startAngle + index * angleBetweenRays)
  // Calculate the distance from each ray to the nearest wall.
  return rayAngles.map(angle => this.castRay(map, angle))
}

// Determine the distance a single ray travels before intersecting a wall.
Player.prototype.castRay = function (map, rawAngle) {
  // Ensure that the angle is between 0 and 360 degrees.
  const angle = normalizeRadians(rawAngle)
  // Determine if the ray is travelling up/down and left/right.
  const up = angle > 0 && angle < Math.PI
  const right = angle < (twoPi * 0.25) || angle > (twoPi * 0.75)
  // Calculate the coordinates of the first horizontal intersection with a grid boundary.
  const intersectionY = Math.floor(this.y / map.height) * map.height + (up ? -1 : map.height)
  const intersectionX = this.x + (this.y - intersectionY) / Math.tan(angle)
  const intersection = new Point(intersectionX, intersectionY)
  const gridCoordinates = intersection.toGrid(map.height)
  return gridCoordinates
}
