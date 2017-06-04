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
  const angleTangent = Math.tan(angle)
  // Find the closest distance to horizontal and vertical walls and return the closest.
  const horizontal = this.findHorizontal(map, angleTangent, up)
  const vertical = this.findVertical(map, angleTangent, right)
  return Math.min(horizontal, vertical)
}

// Find the distance to the first intersection with a horizontal boundary of a wall.
Player.prototype.findHorizontal = function (map, tangent, up) {
  // Find the starting position at the first horizontal intersection with a grid boundary.
  const intersectionY = Math.floor(this.y / map.height) * map.height + (up ? -1 : map.height)
  const intersectionX = this.x + (this.y - intersectionY) / tangent
  let intersection = new Point(intersectionX, intersectionY)
  // Convert to grid coordinates, so we can determine if the this part of the map is a wall or not.
  let gridCoordinates = intersection.toGrid(map.height)
  // Calculate the change in x and y coordinates that will be required to iterate across boundaries.
  const dY = up ? -map.height : map.height
  const dX = map.height / tangent
  // Look for boundaries with walls.
  while (map.isWithinBounds(gridCoordinates)) {
    // Determine if the intersection is with a wall.
    if (map.isWall(gridCoordinates)) {
      // We have intersected a wall, so return the distance to it.
      return Math.hypot(this.x - intersection.x, this.y - intersectionY)
    }
    // We have _not_ intersected a wall, yet. Find the next intersection.
    intersection = intersection.add(dX, dY)
    gridCoordinates = intersection.toGrid(map.height)
  }
  // No boundaries were found within the map and the distance is effectively infinite.
  return Infinity
}

// Find the distance to the first intersection with a vertical boundary of a wall.
Player.prototype.findVertical = function (map, tangent, right) {
  // Calculate the coordinates of the first vertical intersection with a grid boundary.
  const intersectionX = Math.floor(this.x / map.height) * map.height + (right ? map.height : -1)
  const intersectionY = this.y + (this.x - intersectionX) / tangent
  let intersection = new Point(intersectionX, intersectionY)
  // Convert to grid coordinates, so we can determine if the this part of the map is a wall or not.
  let gridCoordinates = intersection.toGrid(map.height)
  // Calculate the change in x and y coordinates that will be required to iterate across boundaries.
  const dX = right ? map.height : -map.height
  const dY = map.height / tangent
  // Look for boundaries with walls.
  while (map.isWithinBounds(gridCoordinates)) {
    // Determine if the intersection is with a wall.
    if (map.isWall(gridCoordinates)) {
      // We have intersected a wall, so return the distance to it.
      return Math.hypot(this.x - intersection.x, this.y - intersectionY)
    }
    // We have _not_ intersected a wall, yet. Find the next intersection.
    intersection = intersection.add(dX, dY)
    gridCoordinates = intersection.toGrid(map.height)
  }
  // No boundaries were found within the map and the distance is effectively infinite.
  return Infinity
}
