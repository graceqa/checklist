import { describe, it, expect } from 'vitest';
import { ROUTINES } from '../data/routines';

describe('Routines Data and Tasks', () => {
  it('contains the exact morning tasks from to do list.pdf', () => {
    const morning = ROUTINES.morning;
    expect(morning).toBeDefined();

    const taskLabels = morning.tasks.map(t => t.label);
    expect(taskLabels).toEqual([
      'Drink water',
      'Change',
      'Eat breakfast',
      'Put dishes/cups away',
      'Brush teeth',
      'Get watch',
      'Pack snacks',
      'Water bottle',
      'Turn off all the lights'
    ]);
  });

  it('contains the exact morning bonus tasks from to do list.pdf', () => {
    const morning = ROUTINES.morning;
    const bonusLabels = morning.bonusTasks.map(t => t.label);
    expect(bonusLabels).toEqual([
      'ChessKids',
      'Read'
    ]);
  });

  it('contains the exact evening tasks from to do list.pdf', () => {
    const evening = ROUTINES.evening;
    expect(evening).toBeDefined();

    const taskLabels = evening.tasks.map(t => t.label);
    expect(taskLabels).toEqual([
      'Charge watch',
      'Do homework',
      'Eat dinner',
      'Violin',
      'Read for 30 minutes',
      'Take a shower',
      'Floss and brush teeth',
      'Put everything I need in backpack',
      'Get everything I need for bed'
    ]);
  });

  it('contains the exact evening bonus task from to do list.pdf', () => {
    const evening = ROUTINES.evening;
    const bonusLabels = evening.bonusTasks.map(t => t.label);
    expect(bonusLabels).toEqual([
      'TV'
    ]);
  });

  it('evaluates bonus unlocking condition strictly when all mandatory tasks are completed', () => {
    const morningTasks = ROUTINES.morning.tasks;

    // Initially 0 completed
    let completedSet = new Set<string>();
    let isAllComplete = morningTasks.every(t => completedSet.has(t.id));
    expect(isAllComplete).toBe(false);

    // Complete 8 out of 9
    morningTasks.slice(0, 8).forEach(t => completedSet.add(t.id));
    isAllComplete = morningTasks.every(t => completedSet.has(t.id));
    expect(isAllComplete).toBe(false);

    // Complete the 9th
    completedSet.add(morningTasks[8].id);
    isAllComplete = morningTasks.every(t => completedSet.has(t.id));
    expect(isAllComplete).toBe(true);

    // Uncheck one item
    completedSet.delete(morningTasks[0].id);
    isAllComplete = morningTasks.every(t => completedSet.has(t.id));
    expect(isAllComplete).toBe(false);
  });
});
