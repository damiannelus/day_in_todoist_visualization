import Agent from '../models/agent'

describe('Agent', () => {
  const agent = new Agent(100, 200, false);
  test('Agent exists', () => {
    expect(agent.anchor.x == agent.pos.x).toEqual(true);
  });
});