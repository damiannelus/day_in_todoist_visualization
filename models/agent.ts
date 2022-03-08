
import Vector from './vector'
import random from 'canvas-sketch-util/random';
import math from 'canvas-sketch-util/math';

class Agent {
  pos: Vector;
  vel: Vector;
  anchor: Vector;

  constructor(x: number, y: number) {
    this.pos = new Vector(x,y);
    this.anchor = new Vector(x,y);
    this.vel = new Vector(random.range(-1,1), random.range(-1,1))
  }

  bounce(width: number, height: number) {
    // Bounce when closing to the boundries
    if (this.pos.x <= 5 || this.pos.x >= width-5) this.vel.x *= -1;
    if (this.pos.y <= 5 || this.pos.y >= height-5) this.vel.y *= -1;

    // Bounce when departing from the anchor
    if (Math.abs(this.pos.x - this.anchor.x) > 10) this.vel.x *= -1;
    if (Math.abs(this.pos.y - this.anchor.y) > 10) this.vel.y *= -1;
  }
}

export default Agent