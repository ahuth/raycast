// @flow

export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(x: number, y: number) {
    return new Point(this.x + x, this.y + y)
  }

  distance(other: Point) {
    return Math.hypot(this.x - other.x, this.y - other.y)
  }
}
