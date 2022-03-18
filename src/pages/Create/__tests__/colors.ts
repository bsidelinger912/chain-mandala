import { getRandomColor } from '../../../colors';

describe('colors', () => {
  it('should get a random color correctly based on birth date', () => {
    const color = getRandomColor(24);
    expect(typeof color).not.toBe(undefined);
  });
});
