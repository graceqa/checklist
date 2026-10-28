import { useState, useEffect, useMemo } from 'react';
import { ActiveRoutineState, NextRoutineInfo, RoutineConfig, RoutineType } from '../types';
import { ROUTINES } from '../data/routines';

// Weekdays: Monday (1) to Friday (5)
function isWeekdayDate(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

function getMinutesOfDay(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

const MORNING_START_MINUTES = 6 * 60; // 06:00 (360)
const MORNING_END_MINUTES = 8 * 60;   // 08:00 (480)
const EVENING_START_MINUTES = 16 * 60; // 16:00 (960)
const EVENING_END_MINUTES = 20 * 60 + 30; // 20:30 (1230)

export function resolveDetectedRoutine(date: Date): ActiveRoutineState {
  const isWeekday = isWeekdayDate(date);
  if (!isWeekday) {
    return 'off_hours';
  }

  const mins = getMinutesOfDay(date);
  if (mins >= MORNING_START_MINUTES && mins < MORNING_END_MINUTES) {
    return 'morning';
  }
  if (mins >= EVENING_START_MINUTES && mins < EVENING_END_MINUTES) {
    return 'evening';
  }

  return 'off_hours';
}

function calculateNextRoutine(now: Date): NextRoutineInfo {
  const day = now.getDay();
  const mins = getMinutesOfDay(now);

  let target = new Date(now);
  target.setSeconds(0, 0);

  let routineName = 'Morning Checklist';

  // Check if today is a weekday
  if (day >= 1 && day <= 5) {
    if (mins < MORNING_START_MINUTES) {
      // Earlier today morning
      target.setHours(6, 0, 0, 0);
      routineName = 'Morning Checklist';
    } else if (mins < EVENING_START_MINUTES) {
      // Today evening
      target.setHours(16, 0, 0, 0);
      routineName = 'Evening Checklist';
    } else {
      // After evening cutoff on a weekday
      routineName = 'Morning Checklist';
      if (day === 5) {
        // Friday night -> next is Monday
        target.setDate(now.getDate() + 3);
      } else {
        // Mon-Thu night -> next is tomorrow
        target.setDate(now.getDate() + 1);
      }
      target.setHours(6, 0, 0, 0);
    }
  } else {
    // Weekend (Saturday=6, Sunday=0)
    routineName = 'Morning Checklist';
    const daysUntilMonday = day === 6 ? 2 : 1;
    target.setDate(now.getDate() + daysUntilMonday);
    target.setHours(6, 0, 0, 0);
  }

  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  let countdown = '';
  if (diffHours > 0) {
    countdown = `${diffHours}h ${diffMins}m`;
  } else {
    countdown = `${diffMins}m`;
  }

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit'
  });

  return {
    name: routineName,
    targetTimeFormatted: timeFormatter.format(target),
    countdown,
    startsAt: target
  };
}

export function useSchedule() {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  // Keep live time ticking every second to automatically enter/exit routines
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const detectedState = useMemo(() => resolveDetectedRoutine(currentDate), [currentDate]);

  const activeRoutineType: RoutineType | null = useMemo(() => {
    if (detectedState === 'morning') return 'morning';
    if (detectedState === 'evening') return 'evening';
    return null;
  }, [detectedState]);

  const activeRoutine: RoutineConfig | null = activeRoutineType ? ROUTINES[activeRoutineType] : null;

  const nextRoutineInfo = useMemo(() => calculateNextRoutine(currentDate), [currentDate]);

  const isWeekday = useMemo(() => isWeekdayDate(currentDate), [currentDate]);

  return {
    currentDate,
    isWeekday,
    detectedState,
    activeRoutineType,
    activeRoutine,
    nextRoutineInfo
  };
}
