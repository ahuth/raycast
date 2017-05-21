export default function Map(size) {
  this.size = size
  this.wallGrid = new Uint8Array(size * size)
}

// eslint-disable-next-line
Map.prototype.update = function (seconds) {
}
