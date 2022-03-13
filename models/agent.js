
import {Vector} from './vector'
import random from 'canvas-sketch-util/random';
import {getProjectColorValue} from '../models/projectColorMap'
const utils = require('../utils/utils');

class Agent {
  constructor(x, y, isFloating, radius, colorID) {
    this.pos = new Vector(x,y);
    this.anchor = new Vector(x,y);
    this.radius = radius > 0 ? radius : random.range(4,12);
    this.isFloating = isFloating;
    this.vel = isFloating ? new Vector(random.range(-1,1), random.range(-1,1)) : new Vector(0,0);
    this.taskID = 0;
    this.color = getProjectColorValue(colorID);
  }

  setInitialPosition(x,y) {
    this.pos = new Vector(x,y);
    this.anchor = new Vector(x,y);
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
    context.strokeStyle = this.color;
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

export {Agent}