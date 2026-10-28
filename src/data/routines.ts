import { RoutineConfig, RoutineType } from '../types';

export const ROUTINES: Record<RoutineType, RoutineConfig> = {
  morning: {
    id: 'morning',
    title: 'Morning Routine',
    subtitle: 'Rise & shine! Get ready for a great day ahead.',
    timeWindowLabel: '6:00 AM – 8:00 AM (Weekdays)',
    badge: 'Morning Checklist',
    icon: '☀️',
    tasks: [
      { id: 'm-water', label: 'Drink water', icon: '💧' },
      { id: 'm-change', label: 'Change', icon: '👕' },
      { id: 'm-breakfast', label: 'Eat breakfast', icon: '🥣' },
      { id: 'm-dishes', label: 'Put dishes/cups away', icon: '🍽️' },
      { id: 'm-teeth', label: 'Brush teeth', icon: '🪥' },
      { id: 'm-watch', label: 'Get watch', icon: '⌚' },
      { id: 'm-snacks', label: 'Pack snacks', icon: '🍎' },
      { id: 'm-bottle', label: 'Water bottle', icon: '🧴' },
      { id: 'm-lights', label: 'Turn off all the lights', icon: '💡' },
    ],
    bonusTasks: [
      { id: 'm-bonus-chess', label: 'ChessKids', icon: '♟️', isBonus: true },
      { id: 'm-bonus-read', label: 'Read', icon: '📖', isBonus: true },
    ]
  },
  evening: {
    id: 'evening',
    title: 'Evening Routine',
    subtitle: 'Wind down and prepare for tomorrow.',
    timeWindowLabel: '4:00 PM – 8:30 PM (Weekdays)',
    badge: 'Evening Checklist',
    icon: '🌙',
    tasks: [
      { id: 'e-watch', label: 'Charge watch', icon: '🔌' },
      { id: 'e-homework', label: 'Do homework', icon: '📝' },
      { id: 'e-dinner', label: 'Eat dinner', icon: '🍲' },
      { id: 'e-violin', label: 'Violin', icon: '🎻' },
      { id: 'e-read', label: 'Read for 30 minutes', icon: '📚' },
      { id: 'e-shower', label: 'Take a shower', icon: '🚿' },
      { id: 'e-teeth', label: 'Floss and brush teeth', icon: '🪥' },
      { id: 'e-backpack', label: 'Put everything I need in backpack', icon: '🎒' },
      { id: 'e-bed', label: 'Get everything I need for bed', icon: '🛌' },
    ],
    bonusTasks: [
      { id: 'e-bonus-tv', label: 'TV', icon: '📺', isBonus: true }
    ]
  }
};
