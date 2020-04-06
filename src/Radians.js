export const twoPi = 2 * Math.PI;

// Convert degrees to radians.
export function fromDegrees(degrees) {
  return degrees * Math.PI / 180;
}

// Ensure that radians are between 0 and 2π.
export function normalize(radians) {
  const newAngle = radians % twoPi;
  return newAngle < 0 ? newAngle + twoPi : newAngle;
}
