import { describe, test, expect, vi } from 'vitest';
import scoreRepository from './ScoreRepository';

describe('ScoreRepository', () => {
  describe('storeHighscore', () => {
    test('should return highscore', () => {
      // Arrange
      const mockStorage: Storage = {
        clear: vi.fn(),
        getItem: () => '10',
        removeItem: vi.fn(),
        setItem: vi.fn(),
        key: vi.fn(),
        length: 0,
      };
      const repository = scoreRepository;

      // Act
      const highscore = repository.storeHighscore(11, mockStorage);

      // Assert
      expect(highscore).toEqual(11);
    });

    test('should return highscore when incomming score does not beat highscore', () => {
      // Arrange
      const mockStorage: Storage = {
        clear: vi.fn(),
        getItem: () => '10',
        removeItem: vi.fn(),
        setItem: vi.fn(),
        key: vi.fn(),
        length: 0,
      };
      const repository = scoreRepository;

      // Act
      const highscore = repository.storeHighscore(5, mockStorage);

      // Assert
      expect(highscore).toEqual(10);
    });
  });
});
