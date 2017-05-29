/* eslint-disable no-extend-native */

export default function Map(size) {
  this.size = size
  this.grid = new Uint8Array(size * size)
}

Map.prototype.randomize = function () {
  for (let i = 0; i < this.size * this.size; i++) {
    this.grid[i] = Math.random() < 0.3 ? 1 : 0
  }
}
