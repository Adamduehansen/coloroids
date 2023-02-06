import { describe, expect, test } from 'vitest';
import combineColors, { ColorChannels } from './combineColors';

describe('combineColors', () => {
  test.each<[ColorChannels, ColorChannels, ColorChannels]>([
    [
      { r: 255, g: 0, b: 0 },
      { r: 255, g: 0, b: 0 },
      { r: 255, g: 0, b: 0 },
    ],
    [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 255, b: 0 },
      { r: 255, g: 255, b: 0 },
    ],
    [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 0, b: 255 },
      { r: 255, g: 0, b: 255 },
    ],
    [
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 255, b: 0 },
    ],
    [
      { r: 0, g: 255, b: 0 },
      { r: 255, g: 0, b: 0 },
      { r: 255, g: 255, b: 0 },
    ],
    [
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 0, b: 255 },
      { r: 0, g: 255, b: 255 },
    ],
    [
      { r: 0, g: 0, b: 255 },
      { r: 0, g: 0, b: 255 },
      { r: 0, g: 0, b: 255 },
    ],
    [
      { r: 0, g: 0, b: 255 },
      { r: 255, g: 0, b: 0 },
      { r: 255, g: 0, b: 255 },
    ],
    [
      { r: 0, g: 0, b: 255 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 255, b: 255 },
    ],
    [
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 0, b: 0 },
      { r: 255, g: 0, b: 0 },
    ],
    [
      { r: 255, g: 255, b: 255 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 255, b: 0 },
    ],
    [
      { r: 255, g: 255, b: 255 },
      { r: 0, g: 0, b: 255 },
      { r: 0, g: 0, b: 255 },
    ],
  ])('should combine colors', (colorA, colorB, expected) => {
    // // Act
    const actual = combineColors(colorA, colorB);

    // // Assert
    expect(actual).toEqual(expected);
  });
});
