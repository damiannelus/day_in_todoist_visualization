require('dotenv').config()
import canvasSketch from 'canvas-sketch';
// const Agent = require('../models/agent');
import random from 'canvas-sketch-util/random';
import { getNoDateAgents, getTodayAgents, getDoneTodayAgents} from '../middleware/todoist/todoist'
import {TodoistDAO} from '../services/todoistDAO'

const settings = {
  dimensions: [200, 200],
  animate: true
};

const floorMargin = 0.2;
const topMargin = 0.2;

const sketch = async ({ width, height }) => {
  const todoistDAO = new TodoistDAO();
  await todoistDAO.init();
  const agents = await getTodayAgents(todoistDAO);
  const floorAgents = await getDoneTodayAgents(todoistDAO);
  const topAgents = await getNoDateAgents(todoistDAO);
  topAgents.forEach(agent => {
    const x = random.range(20, width - 20);
    const y = random.range(10, 10 + (topMargin * height));
    agent.setInitialPosition(x, y);
  });
  agents.forEach(agent => {
      const x = random.range(20, width - 20);
      const y = random.range(10 + (topMargin * height), height - floorMargin * height);
      agent.setInitialPosition(x, y);
    });
  floorAgents.forEach(agent => {
    const x = random.range(20, width - 20);
    const y = random.range(height - floorMargin * height, height-20);
    agent.setInitialPosition(x, y);
  });

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