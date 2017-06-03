/* eslint-disable no-extend-native */

export default function Map(size, height) {
  this.size = size
  this.height = height
  this.grid = new Array(size).fill(new Array(size).fill(0))
}

Map.prototype.randomize = function () {
  for (let i = 0; i < this.size; i++) {
    for (let j = 0; j < this.size; j++) {
      this.grid[i][j] = Math.random() < 0.3 ? 1 : 0
    }
  }
  return this
}

Map.prototype.isWall = function (point) {
  return this.isWithinBounds(point) && this.grid[point.x][point.y] === 1
}

Map.prototype.isWithinBounds = function (point) {
  return point.x >= 0 && point.x < this.size && point.y >=0 && point.y < this.size
}
