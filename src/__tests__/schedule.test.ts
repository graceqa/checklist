import { describe, it, expect } from 'vitest';
import { resolveDetectedRoutine } from '../hooks/useSchedule';

describe('Schedule Detection Logic', () => {
  // Helper to create a specific date
  // Month is 0-indexed (9 = Oct)
  // 2026-10-25 is Sunday (0) ... 2026-10-31 is Saturday (6)
  function createDate(dayOfWeek: number, hours: number, minutes: number): Date {
    const dayOfMonth = 25 + dayOfWeek;
    return new Date(2026, 9, dayOfMonth, hours, minutes, 0, 0);
  }

  it('detects morning routine on weekdays between 5:00 AM and 8:00 AM', () => {
    // Wednesday 5:00 AM
    expect(resolveDetectedRoutine(createDate(3, 5, 0))).toBe('morning');
    // Monday 6:30 AM
    expect(resolveDetectedRoutine(createDate(1, 6, 30))).toBe('morning');
    // Friday 7:59 AM
    expect(resolveDetectedRoutine(createDate(5, 7, 59))).toBe('morning');
  });

  it('detects off-hours before 5:00 AM on weekdays', () => {
    // Wednesday 4:59 AM
    expect(resolveDetectedRoutine(createDate(3, 4, 59))).toBe('off_hours');
  });

  it('detects off-hours at or after 8:00 AM until 3:30 PM on weekdays', () => {
    // Wednesday 8:00 AM
    expect(resolveDetectedRoutine(createDate(3, 8, 0))).toBe('off_hours');
    // Wednesday 12:00 PM
    expect(resolveDetectedRoutine(createDate(3, 12, 0))).toBe('off_hours');
    // Wednesday 3:29 PM (15:29)
    expect(resolveDetectedRoutine(createDate(3, 15, 29))).toBe('off_hours');
  });

  it('detects evening routine on weekdays between 3:30 PM (15:30) and 9:00 PM (21:00)', () => {
    // Wednesday 3:30 PM (15:30)
    expect(resolveDetectedRoutine(createDate(3, 15, 30))).toBe('evening');
    // Thursday 6:15 PM (18:15)
    expect(resolveDetectedRoutine(createDate(4, 18, 15))).toBe('evening');
    // Friday 8:59 PM (20:59)
    expect(resolveDetectedRoutine(createDate(5, 20, 59))).toBe('evening');
  });

  it('detects off-hours at or after 9:00 PM on weekdays', () => {
    // Wednesday 9:00 PM (21:00)
    expect(resolveDetectedRoutine(createDate(3, 21, 0))).toBe('off_hours');
    // Wednesday 10:00 PM (22:00)
    expect(resolveDetectedRoutine(createDate(3, 22, 0))).toBe('off_hours');
  });

  it('detects off-hours all day on weekends (Saturday & Sunday)', () => {
    // Saturday morning 6:00 AM
    expect(resolveDetectedRoutine(createDate(6, 6, 0))).toBe('off_hours');
    // Saturday evening 5:00 PM
    expect(resolveDetectedRoutine(createDate(6, 17, 0))).toBe('off_hours');
    // Sunday morning 7:30 AM
    expect(resolveDetectedRoutine(createDate(0, 7, 30))).toBe('off_hours');
    // Sunday evening 7:00 PM
    expect(resolveDetectedRoutine(createDate(0, 19, 0))).toBe('off_hours');
  });
});
