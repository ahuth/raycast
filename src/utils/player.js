export default function Player(x, y, height, direction) {
  this.x = x
  this.y = y
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
  // the field of view to the left.
  const startAngle = this.direction - fov / 2
  // Generate the angle for each ray starting from the left and sweeping to the right screen edge.
  const rayAngles = new Array(resolution).fill(0).map((_, index) => startAngle + index * angleBetweenRays)
  // Calculate where each ray intersects a wall.
  const rays = rayAngles.map(angle => this.castRay(map, angle))
  return rays
}

// Determine where a single ray from the player's position intersects with the nearest wall.
Player.prototype.castRay = function (map, angle) {
  return 0
}
