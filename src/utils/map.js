// @flow
/* eslint-disable no-extend-native */

import Point from "./point"

export default class Map {
  height: number
  size: 10
  grid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]

  constructor(height: number) {
    this.height = height
  }

  isWall(point: Point) {
    const gridCoordinates = toGrid(point, this.height)
    return this.isWithinBounds(point) && this.grid[gridCoordinates.y][gridCoordinates.x] === 1
  }

  isWithinBounds(point: Point) {
    const gridCoordinates = toGrid(point, this.height)
    return gridCoordinates.x >= 0 && gridCoordinates.x < this.size && gridCoordinates.y >=0 && gridCoordinates.y < this.size
  }
}

// Convert unit coordinates to grid coordinates. Each grid coordinate can be broken up into
// some number of smaller "unit" coordinates.
function toGrid(point, unitsPerGrid) {
  return new Point(Math.floor(point.x / unitsPerGrid), Math.floor(point.y / unitsPerGrid))
}
