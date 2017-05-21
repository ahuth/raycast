export default function Camera(context, resolution, focalLength, range, height, width) {
  this.context = context
  this.resolution = resolution
  this.focalLength = focalLength
  this.range = range
  this.height = height
  this.width = width
}

Camera.prototype.render = function (map, player) {
}
