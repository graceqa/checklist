import { describe, it, expect } from 'vitest';
import { resolveDetectedRoutine } from '../hooks/useSchedule';

describe('Schedule Detection Logic', () => {
  // Helper to create a specific date
  // Month is 0-indexed (9 = Oct)
  // Let's use 2026-10-28 (Wednesday = 3)
  function createDate(dayOfWeek: number, hours: number, minutes: number): Date {
    // 2026-10-25 is Sunday (0)
    // 2026-10-26 is Monday (1)
    // 2026-10-27 is Tuesday (2)
    // 2026-10-28 is Wednesday (3)
    // 2026-10-29 is Thursday (4)
    // 2026-10-30 is Friday (5)
    // 2026-10-31 is Saturday (6)
    const dayOfMonth = 25 + dayOfWeek;
    const date = new Date(2026, 9, dayOfMonth, hours, minutes, 0, 0);
    return date;
  }

  it('detects morning routine on weekdays between 6:00 AM and 8:00 AM', () => {
    // Wednesday 6:00 AM
    expect(resolveDetectedRoutine(createDate(3, 6, 0))).toBe('morning');
    // Monday 6:30 AM
    expect(resolveDetectedRoutine(createDate(1, 6, 30))).toBe('morning');
    // Friday 7:59 AM
    expect(resolveDetectedRoutine(createDate(5, 7, 59))).toBe('morning');
  });

  it('detects off-hours before 6:00 AM on weekdays', () => {
    // Wednesday 5:59 AM
    expect(resolveDetectedRoutine(createDate(3, 5, 59))).toBe('off_hours');
  });

  it('detects off-hours at or after 8:00 AM until 4:00 PM on weekdays', () => {
    // Wednesday 8:00 AM
    expect(resolveDetectedRoutine(createDate(3, 8, 0))).toBe('off_hours');
    // Wednesday 12:00 PM
    expect(resolveDetectedRoutine(createDate(3, 12, 0))).toBe('off_hours');
    // Wednesday 3:59 PM (15:59)
    expect(resolveDetectedRoutine(createDate(3, 15, 59))).toBe('off_hours');
  });

  it('detects evening routine on weekdays between 4:00 PM (16:00) and 8:30 PM (20:30)', () => {
    // Wednesday 4:00 PM (16:00)
    expect(resolveDetectedRoutine(createDate(3, 16, 0))).toBe('evening');
    // Thursday 6:15 PM (18:15)
    expect(resolveDetectedRoutine(createDate(4, 18, 15))).toBe('evening');
    // Friday 8:29 PM (20:29)
    expect(resolveDetectedRoutine(createDate(5, 20, 29))).toBe('evening');
  });

  it('detects off-hours at or after 8:30 PM on weekdays', () => {
    // Wednesday 8:30 PM (20:30)
    expect(resolveDetectedRoutine(createDate(3, 20, 30))).toBe('off_hours');
    // Wednesday 10:00 PM (22:00)
    expect(resolveDetectedRoutine(createDate(3, 22, 0))).toBe('off_hours');
  });

  it('detects off-hours all day on weekends (Saturday & Sunday)', () => {
    // Saturday morning 7:00 AM
    expect(resolveDetectedRoutine(createDate(6, 7, 0))).toBe('off_hours');
    // Saturday evening 5:00 PM
    expect(resolveDetectedRoutine(createDate(6, 17, 0))).toBe('off_hours');
    // Sunday morning 7:30 AM
    expect(resolveDetectedRoutine(createDate(0, 7, 30))).toBe('off_hours');
    // Sunday evening 6:00 PM
    expect(resolveDetectedRoutine(createDate(0, 18, 0))).toBe('off_hours');
  });
});
