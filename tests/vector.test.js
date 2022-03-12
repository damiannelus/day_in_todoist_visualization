import {Vector} from '../models/vector'

describe('Vector', () => {
  const vec = new Vector(100,200);
  test('Vector created', () => {
    expect(vec.x).toBe(100)
    expect(vec.y).toBe(200)
  });
});