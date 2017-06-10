import Point from "./point"
import {normalize, twoPi} from "./radians"

export default function Ray(map, angle, x, y) {
  this.map = map
  this.origin = new Point(x, y)
  this.angle = normalize(angle)
}

// Determine the distance this ray will travel before hitting a wall.
Ray.prototype.cast = function () {
  // Determine if the ray is travelling up/down and left/right.
  const up = this.angle > 0 && this.angle < Math.PI
  const right = this.angle < (twoPi * 0.25) || this.angle > (twoPi * 0.75)
  // Pre-calculate the slope of the line in our coordinate system from the angle.
  const slope = Math.tan(this.angle)
  // Really naive algorithm to do this... probably really slow, too.
  const dx = right ? 1 : -1
  const dy = Math.abs(slope) * (up ? -1 : 1)
  let position = new Point(this.origin.x, this.origin.y)
  let gridPosition = position.toGrid(this.map.height)
  while (this.map.isWithinBounds(gridPosition)) {
    // Determine if the intersection is with a wall.
    if (this.map.isWall(gridPosition)) {
      // We have intersected a wall, so return the distance to it.
      return position.distance(this.origin)
    }
    // We have _not_ intersected a wall, yet. Find the next intersection.
    position = position.add(dx, dy)
    gridPosition = position.toGrid(this.map.height)
  }
  return Infinity
}
