class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }
}

export default Point;
