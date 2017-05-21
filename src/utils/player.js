export default function Player(x, y, direction) {
  this.x = x
  this.y = y
  this.direction = direction
}

Player.prototype.walk = function (distance, map) {
  const dx = Math.cos(this.direction) * distance
  const dy = Math.sin(this.direction) * distance
  this.x += dx
  this.y += dy
}
