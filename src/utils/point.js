export default function Point(x, y) {
  this.x = x
  this.y = y
}

// Convert unit coordinates to grid coordinates. Each grid coordinate can be broken up into
// some number of smaller "unit" coordinates.
Point.prototype.toGrid = function (unitsPerGrid) {
  return new Point(Math.floor(this.x / unitsPerGrid), Math.floor(this.y / unitsPerGrid))
}

// Return a new point with the values incremented by the passed-in values.
Point.prototype.add = function (x, y) {
  return new Point(this.x + x, this.y + y)
}
