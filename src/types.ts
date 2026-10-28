export interface TaskItem {
  id: string;
  label: string;
  icon: string;
  isBonus?: boolean;
}

export type RoutineType = 'morning' | 'evening';

export interface RoutineConfig {
  id: RoutineType;
  title: string;
  subtitle: string;
  timeWindowLabel: string;
  badge: string;
  icon: string;
  tasks: TaskItem[];
  bonusTasks: TaskItem[];
}

export type ActiveRoutineState = 'morning' | 'evening' | 'off_hours';

export interface NextRoutineInfo {
  name: string;
  targetTimeFormatted: string;
  countdown: string;
  startsAt: Date;
}
