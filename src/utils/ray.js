import Point from "./point"
import {normalize, twoPi} from "./radians"

export default function Ray(map, angle, x, y) {
  this.map = map
  this.origin = new Point(x, y)
  this.angle = normalize(angle)
}

// Determine the distance this ray will travel before hitting a wall.
Ray.prototype.cast = function () {
  // Determine the distance to the first horizontal wall.
  const horizontalDistance = castHorizontal(this.map, this.origin, this.angle)
  // Determine the distance to the first vertical wall.
  const verticalDistance = castVertical(this.map, this.origin, this.angle)
  // Return the shortest distance between the horizontal and vertical distances.
  return Math.min(horizontalDistance, verticalDistance)
}

// Determine the distance the ray will travel before hitting a _horizontal_ wall.
function castHorizontal(map, origin, angle) {
  // Determine if the ray is travelling up or down.
  const up = angle > 0 && angle < Math.PI
  // Calculate the coordinates of the first horizontal intersection with a grid boundary.
  const intersectionY = Math.floor(origin.y / map.height) * map.height + (up ? -1 : map.height)
  const intersectionX = origin.x + (origin.y - intersectionY) / Math.tan(angle)
  let intersection = new Point(intersectionX, intersectionY)
  // Calculate the change in x and y coordinates needed to iterate across boundaries.
  const deltaY = up ? -map.height : map.height
  const deltaX = map.height / Math.tan(angle)
  // Find the nearest intersection and return the distance to it.
  const wall = findWall(map, intersection, deltaX, deltaY)
  return wall ? wall.distance(origin) : Infinity
}

// Determine the distance the ray will travel before hitting a _vertical_ wall.
function castVertical(map, origin, angle) {
  // Determine if the ray is travelling left or right.
  const right = angle < (twoPi * 0.25) || angle > (twoPi * 0.75)
  // Calculate the coordinates of the first vertical intersection with a grid boundary.
  const intersectionX = Math.floor(origin.x / map.height) * map.height + (right ? map.height : -1)
  const intersectionY = origin.y + (origin.x - intersectionX) / Math.tan(angle)
  let intersection = new Point(intersectionX, intersectionY)
  // Calculate the change in x and y coordinates needed to iterate across boundaries.
  const deltaX = right ? map.height : -map.height
  const deltaY = map.height / Math.tan(angle)
  // Find the nearest intersection and return the distance to it.
  const wall = findWall(map, intersection, deltaX, deltaY)
  return wall ? wall.distance(origin) : Infinity
}

// Recurse until we either leave the boundaries of the map or hit a wall.
function findWall(map, position, deltaX, deltaY) {
  const gridCoordinates = position.toGrid(map.height)
  if (map.isWithinBounds(gridCoordinates)) {
    if (map.isWall(gridCoordinates)) {
      return position
    }
    return findWall(map, position.add(deltaX, deltaY), deltaX, deltaY)
  }
}
