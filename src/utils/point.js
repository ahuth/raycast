export default function Point(x, y) {
  this.x = x
  this.y = y
}

// Return a new point with the values incremented by the passed-in values.
Point.prototype.add = function (x, y) {
  return new Point(this.x + x, this.y + y)
}

// Return the distance between this point and another.
Point.prototype.distance = function (other) {
  return Math.hypot(this.x - other.x, this.y - other.y)
}
