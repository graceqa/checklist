import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { RoutineConfig } from '../types';
import { playCheckSound, playUncheckSound, playBonusUnlockSound } from '../utils/audio';
import { fireBonusUnlockedConfetti, fireTaskDoneConfetti } from '../utils/confetti';

export function useChecklist(routine: RoutineConfig | null) {
  // In-session state only: does not write to localStorage
  // Page refresh resets the state automatically
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => new Set());
  const prevAllMandatoryRef = useRef<boolean>(false);
  const currentRoutineIdRef = useRef<string | null>(routine ? routine.id : null);

  // Automatically reset state when routine changes or when time limit is up (routine becomes null)
  useEffect(() => {
    const routineId = routine ? routine.id : null;
    if (routineId !== currentRoutineIdRef.current) {
      currentRoutineIdRef.current = routineId;
      setCompletedIds(new Set());
      prevAllMandatoryRef.current = false;
    }
  }, [routine]);

  // Mandatory completion metrics
  const totalMandatoryCount = routine ? routine.tasks.length : 0;

  const completedMandatoryCount = useMemo(() => {
    if (!routine) return 0;
    return routine.tasks.filter(t => completedIds.has(t.id)).length;
  }, [routine, completedIds]);

  const allMandatoryCompleted = useMemo(() => {
    return totalMandatoryCount > 0 && completedMandatoryCount === totalMandatoryCount;
  }, [totalMandatoryCount, completedMandatoryCount]);

  const percentage = useMemo(() => {
    if (totalMandatoryCount === 0) return 0;
    return Math.round((completedMandatoryCount / totalMandatoryCount) * 100);
  }, [completedMandatoryCount, totalMandatoryCount]);

  // Bonus completion metrics
  const completedBonusCount = useMemo(() => {
    if (!routine) return 0;
    return routine.bonusTasks.filter(t => completedIds.has(t.id)).length;
  }, [routine, completedIds]);

  const toggleTask = useCallback((taskId: string, clickCoordinates?: { x: number; y: number }) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      const isCurrentlyCompleted = next.has(taskId);

      if (isCurrentlyCompleted) {
        next.delete(taskId);
        playUncheckSound();
      } else {
        next.add(taskId);
        playCheckSound();

        // Subtle tap confetti
        if (clickCoordinates) {
          fireTaskDoneConfetti(clickCoordinates.x, clickCoordinates.y);
        }
      }

      // Check if this action triggers unlocking all mandatory items
      if (routine && !isCurrentlyCompleted) {
        const willBeAllMandatory = routine.tasks.every(t => next.has(t.id));
        if (willBeAllMandatory && !prevAllMandatoryRef.current) {
          prevAllMandatoryRef.current = true;
          setTimeout(() => {
            playBonusUnlockSound();
            fireBonusUnlockedConfetti();
          }, 150);
        }
      } else if (routine && isCurrentlyCompleted) {
        const stillAllMandatory = routine.tasks.every(t => next.has(t.id));
        prevAllMandatoryRef.current = stillAllMandatory;
      }

      return next;
    });
  }, [routine]);

  const isTaskCompleted = useCallback((taskId: string) => {
    return completedIds.has(taskId);
  }, [completedIds]);

  const resetRoutine = useCallback(() => {
    setCompletedIds(new Set());
    prevAllMandatoryRef.current = false;
  }, []);

  return {
    completedIds,
    toggleTask,
    isTaskCompleted,
    allMandatoryCompleted,
    completedMandatoryCount,
    totalMandatoryCount,
    completedBonusCount,
    totalBonusCount: routine ? routine.bonusTasks.length : 0,
    percentage,
    resetRoutine
  };
}
