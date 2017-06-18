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
  return this.isWithinBounds(point) && this.grid[point.y][point.x] === 1
}

Map.prototype.isWithinBounds = function (point) {
  return point.x >= 0 && point.x < this.size && point.y >=0 && point.y < this.size
}
