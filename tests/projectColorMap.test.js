import {getProjectColorValue} from '../models/projectColorMap'

describe('Project Color', () => {
  test('orange', () => {
    expect(getProjectColorValue(32)).toBe('#ff9933')
  });
  test('teal', () => {
    expect(getProjectColorValue(38)).toBe('#158fad')
  });
  test('charcoal', () => {
    expect(getProjectColorValue(47)).toBe('#808080')
  });
  test('default', () => {
    expect(getProjectColorValue(666)).toBe('#f0f0f0')
  });
});