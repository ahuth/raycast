/* eslint-disable no-extend-native */

export default function Map(height) {
  this.height = height
  this.size = 10
  this.grid = [
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
}

Map.prototype.isWall = function (point) {
  const gridCoordinates = point.toGrid(this.height);
  return this.isWithinBounds(gridCoordinates) && this.grid[gridCoordinates.y][gridCoordinates.x] === 1
}

Map.prototype.isWithinBounds = function (point) {
  const gridCoordinates = point.toGrid(this.height);
  return gridCoordinates.x >= 0 && gridCoordinates.x < this.size && gridCoordinates.y >=0 && gridCoordinates.y < this.size
}
