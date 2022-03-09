const Agent = require('../models/agent');

function calculatePythagorianDistance(agent1, agent2) {
  return Math.sqrt((agent1.pos.x-agent2.pos.x)**2 +(agent1.pos.y-agent2.pos.y)**2)
}

function rgb2hex (r, g, b)  {
  let rgb = (r << 16) | (g << 8) | b
  // return '#' + rgb.toString(16) // #80c0
  // return '#' + (0x1000000 + rgb).toString(16).slice(1) // #0080c0
  // or use [padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
  return '#' + rgb.toString(16).padStart(6, 0)  
}

module.exports = {
  calculatePythagorianDistance,
  rgb2hex
}