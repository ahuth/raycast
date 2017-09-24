// @flow

import Point from "./point"
import {normalize, twoPi} from "./radians"

export default function Ray(map, angle, origin) {
  this.map = map
  this.origin = origin
  this.angle = normalize(angle)
}

// Determine the distance travelled before hitting a wall.
Ray.prototype.cast = function () {
  // Determine the direction the ray is travelling.
  const up = this.angle > 0 && this.angle < Math.PI
  const right = this.angle < (twoPi * 0.25) || this.angle > (twoPi * 0.75)
  // Determine the distance to the first horizontal wall.
  const horizontalDistance = castHorizontal(this.map, this.origin, this.angle, up, right)
  // Determine the distance to the first vertical wall.
  const verticalDistance = castVertical(this.map, this.origin, this.angle, up, right)
  // Return the shortest distance between the horizontal and vertical distances.
  return Math.min(horizontalDistance, verticalDistance)
}

// Determine the distance travelled before hitting a _horizontal_ wall.
function castHorizontal(map, origin, angle, up, right) {
  // Calculate the coordinates of the first intersection with a grid boundary.
  const intersectionY = Math.floor(origin.y / map.height) * map.height + (up ? -0.01 : map.height)
  const intersectionX = origin.x + (origin.y - intersectionY) / Math.tan(angle)
  const intersection = new Point(intersectionX, intersectionY)
  // Calculate the change in x and y coordinates needed to iterate across grid boundaries.
  const deltaY = up ? -map.height : map.height
  const deltaX = Math.abs(map.height / Math.tan(angle)) * (right ? 1 : -1)
  // Find the nearest wall and return the distance to it.
  const wall = findWall(map, intersection, deltaX, deltaY)
  return wall.distance(origin)
}

// Determine the distance travelled before hitting a _vertical_ wall.
function castVertical(map, origin, angle, up, right) {
  // Calculate the coordinates of the first intersection with a grid boundary.
  const intersectionX = Math.floor(origin.x / map.height) * map.height + (right ? map.height : -0.01)
  const intersectionY = origin.y + (origin.x - intersectionX) * Math.tan(angle)
  const intersection = new Point(intersectionX, intersectionY)
  // Calculate the change in x and y coordinates needed to iterate across grid boundaries.
  const deltaX = right ? map.height : -map.height
  const deltaY = Math.abs(map.height * Math.tan(angle)) * (up ? -1 : 1)
  // Find the nearest wall and return the distance to it.
  const wall = findWall(map, intersection, deltaX, deltaY)
  return wall.distance(origin)
}

// Process each step the ray takes until encountering a wall or the bounds of the map.
function findWall(map, position, deltaX, deltaY) {
  // If the ray is no longer within the bounds of the map, return a point infinitely far away.
  if (!map.isWithinBounds(position)) {
    return new Point(Infinity, Infinity)
  }
  // If the ray has hit a wall, return its position.
  if (map.isWall(position)) {
    return position
  }
  // No wall has been encountered. Iterate to the next grid boundary and check again.
  return findWall(map, position.add(deltaX, deltaY), deltaX, deltaY)
}
