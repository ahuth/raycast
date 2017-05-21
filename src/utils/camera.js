export default function Camera(context, resolution, focalLength, range) {
  this.context = context
  this.resolution = resolution
  this.focalLength = focalLength
  this.range = range
}

Camera.prototype.render = function (map, player) {
}
