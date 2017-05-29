export default function Player(x, y, height, direction) {
  this.x = x
  this.y = y
  this.height = height
  this.direction = direction
}

Player.prototype.walk = function (distance, map) {
  const dx = Math.cos(this.direction) * distance
  const dy = Math.sin(this.direction) * distance
  this.x += dx
  this.y += dy
}

Player.prototype.update = function (map, seconds) {
}
