import canvasSketch from 'canvas-sketch';
// const Agent = require('../models/agent');
import { Agent } from '../models/agent.js'
import random from 'canvas-sketch-util/random';

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const floorMargin = 0.2;
const topMargin = 0.2;

const sketch = ({ width, height }) => {
  const agents = [];
  const floorAgents = [];
  const topAgents = [];

  for (let i = 0; i < 50; i++) {
    const x = random.range(20, width-20);
    const y = random.range(10, 10 + (topMargin * height));
    topAgents.push(new Agent(x, y, false));    
  }

  for (let i = 0; i < 35; i++) {
    const x = random.range(20, width-20);
    const y = random.range(10 + (topMargin * height), height - floorMargin * height);

    agents.push(new Agent(x, y, true));
  }

  for (let i = 0; i < 5; i++) {
    const x = random.range(20, width-20);
    const y = random.range((1 - floorMargin) * height, height-20)

    floorAgents.push(new Agent(x, y, false));
  }
  return ({ context, width, height }) => {
    // Margin in inches
    const margin = 1 / 4;

    // Off-white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Gradient foreground
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0, 'cyan');
    fill.addColorStop(1, 'orange');

    for (const agentIndex in agents) {
      if (Object.hasOwnProperty.call(agents, agentIndex)) {
        const agent = agents[agentIndex];
        agent.update();
        // color based on the position of the agent
        agent.draw(context, width, height);
        agent.bounce(width, height);
      }
    }

    for (const agentIndex in floorAgents) {
      if (Object.hasOwnProperty.call(floorAgents, agentIndex)) {
        const agent = floorAgents[agentIndex];
        agent.update();
        // color based on the position of the agent
        agent.draw(context, width, height);
        agent.bounce(width, height);
      }
    }
    
    for (const agentIndex in topAgents) {
      if (Object.hasOwnProperty.call(topAgents, agentIndex)) {
        const agent = topAgents[agentIndex];
        agent.update();
        // color based on the position of the agent
        agent.draw(context, width, height);
        agent.bounce(width, height);
      }
    }
  };
};

canvasSketch(sketch, settings);

export {sketch}