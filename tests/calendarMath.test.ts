import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isLeapYear, getDaysInMonth, getFirstDayOfWeekMondayBased, generateMonthGrid } from '../src/lib/calendar';

describe('Calendar Math & Leap Years', () => {
  it('correctly calculates leap years', () => {
    assert.equal(isLeapYear(2024), true, '2024 is a leap year');
    assert.equal(isLeapYear(2025), false, '2025 is not a leap year');
    assert.equal(isLeapYear(2026), false, '2026 is not a leap year');
    assert.equal(isLeapYear(2028), true, '2028 is a leap year');
    assert.equal(isLeapYear(1900), false, '1900 is not a leap year (divisible by 100, not 400)');
    assert.equal(isLeapYear(2000), true, '2000 is a leap year (divisible by 400)');
  });

  it('correctly calculates days in February', () => {
    assert.equal(getDaysInMonth(2024, 2), 29, 'Feb 2024 has 29 days');
    assert.equal(getDaysInMonth(2025, 2), 28, 'Feb 2025 has 28 days');
    assert.equal(getDaysInMonth(2026, 2), 28, 'Feb 2026 has 28 days');
    assert.equal(getDaysInMonth(2028, 2), 29, 'Feb 2028 has 29 days');
  });

  it('correctly determines Monday-based first day offset', () => {
    // Jan 1, 2026 is Thursday -> Monday=0, Tue=1, Wed=2, Thu=3
    const jan2026Offset = getFirstDayOfWeekMondayBased(2026, 1);
    assert.equal(jan2026Offset, 3, 'Jan 1, 2026 should be Thursday (offset 3)');

    // Feb 1, 2026 is Sunday -> offset 6
    const feb2026Offset = getFirstDayOfWeekMondayBased(2026, 2);
    assert.equal(feb2026Offset, 6, 'Feb 1, 2026 should be Sunday (offset 6)');

    // June 1, 2026 is Monday -> offset 0
    const jun2026Offset = getFirstDayOfWeekMondayBased(2026, 6);
    assert.equal(jun2026Offset, 0, 'June 1, 2026 should be Monday (offset 0)');
  });

  it('generates 42-cell grid for 6-row months (e.g. March 2026)', () => {
    // March 2026: starts on Sunday (offset 6), has 31 days -> 6 + 31 = 37 slots -> requires 6 rows (42 cells)
    const grid = generateMonthGrid(2026, 3);
    assert.equal(grid.rowCount, 6, 'March 2026 must have 6 rows');
    assert.equal(grid.cells.length, 42, 'March 2026 must have 42 cells total');
    assert.equal(grid.firstDayOffset, 6, 'March 2026 firstDayOffset must be 6 (Sunday)');
    assert.equal(grid.daysInMonth, 31, 'March 2026 must have 31 days');

    // Day 1 should be at index 6
    assert.equal(grid.cells[6]?.dayNumber, 1);
    assert.equal(grid.cells[6]?.isCurrentMonth, true);

    // Day 31 should be at index 36 (6 + 31 - 1)
    assert.equal(grid.cells[36]?.dayNumber, 31);
    assert.equal(grid.cells[36]?.isCurrentMonth, true);

    // Index 37..41 should be next month padding (null)
    assert.equal(grid.cells[37]?.isCurrentMonth, false);
    assert.equal(grid.cells[37]?.dayNumber, null);
  });

  it('generates 35-cell grid for 5-row months', () => {
    // June 2026: starts on Monday (offset 0), 30 days -> 30 slots -> fits in 5 rows (35 cells)
    const grid = generateMonthGrid(2026, 6);
    assert.equal(grid.rowCount, 5, 'June 2026 must have 5 rows');
    assert.equal(grid.cells.length, 35, 'June 2026 must have 35 cells');
  });
});
