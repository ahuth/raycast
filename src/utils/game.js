export default function Game(camera, player, map) {
  this.camera = camera
  this.player = player
  this.map = map
  map.randomize()
}

Game.prototype.update = function (seconds) {
  this.map.update(seconds)
  this.player.update(this.map, seconds)
  this.camera.render(this.map, this.player)
}
