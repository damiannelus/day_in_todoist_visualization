
import {Vector} from './vector'
import random from 'canvas-sketch-util/random';
const utils = require('../utils/utils');

export default class Agent {
  constructor(x, y, isFloating) {
    this.pos = new Vector(x,y);
    this.anchor = new Vector(x,y);
    this.radius = random.range(4,12);
    this.isFloating = isFloating;
    this.vel = isFloating ? new Vector(random.range(-1,1), random.range(-1,1)) : new Vector(0,0);
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context, width, height) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 3;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.strokeStyle = this.isFloating ? 
      utils.rgb2hex(200, 
        (this.pos.x/width)*255, 
        (this.pos.y/height)*255) : 
        'black';
    console.log('context.strokeStyle :>> ', context.strokeStyle);
    context.fill();
    context.stroke();
    context.restore();
  }

  bounce(width, height) {
    // Bounce when closing to the boundries
    if (this.pos.x <= 5 || this.pos.x >= width-5) this.vel.x *= -1;
    if (this.pos.y <= 5 || this.pos.y >= height-5) this.vel.y *= -1;

    // Bounce when departing from the anchor
    if (Math.abs(this.pos.x - this.anchor.x) > 10) this.vel.x *= -1;
    if (Math.abs(this.pos.y - this.anchor.y) > 10) this.vel.y *= -1;
  }
  
}