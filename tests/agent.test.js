/**
 * @jest-environment jsdom
 */
import {Agent} from '../models/agent'
import 'jest-canvas-mock';


describe('Agent', () => {
  // let canvas, ctx;
  // const settings = {
  //   dimensions: [1080, 1080],
  //   animate: true
  // };
  // beforeEach(function() {
  //   canvas = document.createElement('canvas');
  //   ctx = canvas.getContext('2d');
  // });

  const agent = new Agent(Math.random()*1000, Math.random()*1000, false);
  const floatingAgent = new Agent(Math.random()*1000, Math.random()*1000, true);
  test('Agent exists', () => {
    expect(agent.anchor.x == agent.pos.x).toEqual(true);
    expect(agent.anchor.y == agent.pos.y).toEqual(true);
  });
  test('Update function works for STATIC agent', () => {
    agent.update();
    expect(agent.anchor.y == agent.pos.y).toEqual(true);
    expect(agent.anchor.x == agent.pos.x).toEqual(true);
  });

  test('Update function works for FLOATING agent', () => {
    floatingAgent.update();
    expect(floatingAgent.anchor.y == floatingAgent.pos.y).toEqual(false);
    expect(floatingAgent.anchor.x == floatingAgent.pos.x).toEqual(false);
  });

});