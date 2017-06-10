import Point from "./point"
import Ray from "./ray"

const stepDistance = 2
const turnRotation = 0.03

export default function Player(x, y, height, direction) {
  this.position = new Point(x, y)
  this.height = height
  this.direction = direction
}

// Determine the distance to walls the user can see by casting rays of light from the player's
// eyes and figuring out where they intersect with a wall. The `resolution` is the number of rays
// to cast, and `fov` determines how spread apart they will be.
Player.prototype.castRays = function (map, fov, resolution) {
  // If the field of view is 60 degrees and the resolution is 320, there is 60 / 320 degrees
  // between each ray.
  const angleBetweenRays = fov / resolution
  // The player's direction is the center of the screen, and the left edge of the screen is half
  // the field of view to the left. In our coordinate system, angles increase as we turn counter-
  // clockwise, so we add to player's current direction.
  const startAngle = this.direction + fov / 2
  // Generate the angle for each ray starting from the left and sweeping to the right screen edge.
  const rayAngles = new Array(resolution).fill(0).map((_, index) => startAngle - index * angleBetweenRays)
  // Calculate the distance from each ray to the nearest wall.
  return rayAngles.map(angle => this.castRay(map, angle))
}

// Determine the distance a single ray travels before intersecting a wall.
Player.prototype.castRay = function (map, angle) {
  // Find the raw distance to the nearest wall.
  const distance = new Ray(map, angle, this.position).cast()
  // Correct for fishbowl-effect resulting from mixing polar and cartesian coordinates.
  return distance * Math.cos(angle - this.direction)
}

Player.prototype.turnRight = function () {
  this.direction -= turnRotation
}

Player.prototype.turnLeft = function () {
  this.direction += turnRotation
}

Player.prototype.moveForward = function () {
  const deltaX = stepDistance * Math.cos(this.direction)
  const deltaY = stepDistance * Math.sin(this.direction)
  this.position = this.position.add(deltaX, -deltaY)
}

Player.prototype.moveBackward = function () {
  const deltaX = stepDistance * Math.cos(this.direction)
  const deltaY = stepDistance * Math.sin(this.direction)
  this.position = this.position.add(-deltaX, deltaY)
}

// Step to the left, which is the same as stepping forward but rotated 90 degrees to the left.
Player.prototype.moveLeft = function () {
  const deltaX = stepDistance * Math.cos(this.direction + Math.PI / 2)
  const deltaY = stepDistance * Math.sin(this.direction + Math.PI / 2)
  this.position = this.position.add(deltaX, -deltaY)
}

// Step to the right, which is the same as stepping backward but rotated 90 degrees to the left.
Player.prototype.moveRight = function () {
  const deltaX = stepDistance * Math.cos(this.direction + Math.PI / 2)
  const deltaY = stepDistance * Math.sin(this.direction + Math.PI / 2)
  this.position = this.position.add(-deltaX, deltaY)
}
