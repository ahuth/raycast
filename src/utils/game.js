export default function Game(camera, player, map) {
  this.camera = camera
  this.player = player
  this.map = map
}

Game.prototype.update = function (seconds) {}
