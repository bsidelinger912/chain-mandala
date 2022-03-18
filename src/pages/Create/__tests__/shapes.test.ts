import { getLine, getPerpendicular } from '../functions';
import { startPointsFixture } from './fixtures';

describe('line', () => {
  it('should correctly make a set of lines', () => {
    const lines = getLine(1, 15, 6, '#fff');

    lines.forEach((line, index) => {
      expect(line.x1).toEqual(startPointsFixture[index].x1);
      expect(line.y1).toEqual(startPointsFixture[index].y1);
    });
  });
});

describe('perpendicular', () => {
  it('should correctly make a set of perpendiculars', () => {
    const perpendiculars = getPerpendicular(1, 15, 6, '#fff');

    perpendiculars.forEach((perpendicular, index) => {
      expect(perpendicular.x1).toEqual(startPointsFixture[index].x1);
      expect(perpendicular.y1).toEqual(startPointsFixture[index].y1);
    });
  });
});
