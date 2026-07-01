import { describe, expect, test } from 'bun:test';

import { getDiscountZheByGroupRatio } from './discount';

describe('getDiscountZheByGroupRatio', () => {
  test('calculates discount as group ratio times 10 and caps at 10', () => {
    expect(getDiscountZheByGroupRatio(0.5)).toBe(5);
    expect(getDiscountZheByGroupRatio(0.85)).toBe(8.5);
    expect(getDiscountZheByGroupRatio(1)).toBe(10);
    expect(getDiscountZheByGroupRatio(1.2)).toBe(10);
  });
});
