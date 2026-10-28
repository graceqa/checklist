import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChecklist } from '../hooks/useChecklist';
import { ROUTINES } from '../data/routines';

describe('useChecklist in-session state behavior', () => {
  it('retains checked items during the same session without writing to localStorage', () => {
    const morningRoutine = ROUTINES.morning;
    const { result } = renderHook(() => useChecklist(morningRoutine));

    expect(result.current.completedIds.size).toBe(0);
    expect(result.current.allMandatoryCompleted).toBe(false);

    // Check first item
    act(() => {
      result.current.toggleTask(morningRoutine.tasks[0].id);
    });

    expect(result.current.isTaskCompleted(morningRoutine.tasks[0].id)).toBe(true);
    expect(result.current.completedMandatoryCount).toBe(1);

    // Check remaining items to unlock bonus
    act(() => {
      morningRoutine.tasks.slice(1).forEach(task => {
        result.current.toggleTask(task.id);
      });
    });

    expect(result.current.completedMandatoryCount).toBe(9);
    expect(result.current.allMandatoryCompleted).toBe(true);

    // Unchecking an item locks bonus again
    act(() => {
      result.current.toggleTask(morningRoutine.tasks[0].id);
    });
    expect(result.current.completedMandatoryCount).toBe(8);
    expect(result.current.allMandatoryCompleted).toBe(false);
  });

  it('automatically clears progress when the time limit is up (routine becomes null)', () => {
    let currentRoutine = ROUTINES.morning as typeof ROUTINES.morning | null;
    const { result, rerender } = renderHook(() => useChecklist(currentRoutine));

    // Check 3 tasks
    act(() => {
      result.current.toggleTask(ROUTINES.morning.tasks[0].id);
      result.current.toggleTask(ROUTINES.morning.tasks[1].id);
      result.current.toggleTask(ROUTINES.morning.tasks[2].id);
    });

    expect(result.current.completedMandatoryCount).toBe(3);

    // Time window expires: routine becomes null (off_hours)
    currentRoutine = null;
    rerender();

    expect(result.current.completedIds.size).toBe(0);
    expect(result.current.completedMandatoryCount).toBe(0);
  });

  it('automatically clears progress if switching between routines', () => {
    let currentRoutine = ROUTINES.morning as typeof ROUTINES.morning | typeof ROUTINES.evening | null;
    const { result, rerender } = renderHook(() => useChecklist(currentRoutine));

    act(() => {
      result.current.toggleTask(ROUTINES.morning.tasks[0].id);
    });
    expect(result.current.completedMandatoryCount).toBe(1);

    // Transition to evening
    currentRoutine = ROUTINES.evening;
    rerender();

    expect(result.current.completedIds.size).toBe(0);
    expect(result.current.completedMandatoryCount).toBe(0);
  });
});
