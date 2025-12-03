import { describe, it, expect } from '@jest/globals';

describe('addDate utility function', () => {
  test('should correctly add days to a given date', () => {
    // Arrange
    const inputDate = new Date('2023-01-01');
    const daysToAdd = 5;

    // Act
    const result = addDate(inputDate, daysToAdd);

    // Assert
    expect(result).toEqual(new Date('2023-01-06'));
  });

  test('should handle negative days correctly', () => {
    // Arrange
    const inputDate = new Date('2023-01-01');
    const daysToAdd = -5;

    // Act
    const result = addDate(inputDate, daysToAdd);

    // Assert
    expect(result).toEqual(new Date('2022-12-27'));
  });
});

// Mock implementation of addDate (replace with actual implementation)
function addDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
