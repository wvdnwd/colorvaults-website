export interface CalendarDayCell {
  dayNumber: number | null; // null for padding before month starts or after it ends
  isCurrentMonth: boolean;
  isWeekend: boolean;
}

export interface MonthGridData {
  year: number;
  month: number; // 1-12
  daysInMonth: number;
  firstDayOffset: number; // 0 = Mon, ..., 6 = Sun
  rowCount: number; // 5 or 6
  cells: CalendarDayCell[];
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(year: number, month1Indexed: number): number {
  if (month1Indexed === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  if ([4, 6, 9, 11].includes(month1Indexed)) {
    return 30;
  }
  return 31;
}

/**
 * Returns Monday-based day offset: 0 for Monday, 1 for Tuesday, ..., 6 for Sunday.
 */
export function getFirstDayOfWeekMondayBased(year: number, month1Indexed: number): number {
  const d = new Date(year, month1Indexed - 1, 1);
  const jsDay = d.getDay(); // 0 = Sun, 1 = Mon, ...
  return (jsDay + 6) % 7;
}

/**
 * Generates the complete 5- or 6-row grid for a given year and month (1-indexed).
 */
export function generateMonthGrid(year: number, month1Indexed: number): MonthGridData {
  const daysInMonth = getDaysInMonth(year, month1Indexed);
  const firstDayOffset = getFirstDayOfWeekMondayBased(year, month1Indexed);

  const totalSlotsNeeded = firstDayOffset + daysInMonth;
  const rowCount = totalSlotsNeeded > 35 ? 6 : 5;
  const totalCells = rowCount * 7;

  const cells: CalendarDayCell[] = [];

  for (let i = 0; i < totalCells; i++) {
    const dayIndex = i - firstDayOffset + 1;
    const isCurrentMonth = dayIndex >= 1 && dayIndex <= daysInMonth;
    const colIndex = i % 7; // 0 = Mon, 5 = Sat, 6 = Sun
    const isWeekend = colIndex === 5 || colIndex === 6;

    cells.push({
      dayNumber: isCurrentMonth ? dayIndex : null,
      isCurrentMonth,
      isWeekend,
    });
  }

  return {
    year,
    month: month1Indexed,
    daysInMonth,
    firstDayOffset,
    rowCount,
    cells,
  };
}
