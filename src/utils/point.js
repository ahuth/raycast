export default function Point(x, y) {
  this.x = x
  this.y = y
}

// Convert unit coordinates to grid coordinates. Each grid coordinate can be broken up into
// some number of smaller "unit" coordinates.
Point.prototype.toGrid = function(unitsPerGrid) {
  return new Point(Math.floor(this.x / unitsPerGrid), Math.floor(this.y / unitsPerGrid))
}
