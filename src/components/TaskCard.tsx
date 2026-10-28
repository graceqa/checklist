import React from 'react';
import { TaskItem } from '../types';

interface TaskCardProps {
  task: TaskItem;
  completed: boolean;
  onToggle: (taskId: string, clickCoordinates?: { x: number; y: number }) => void;
  isBonus?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, completed, onToggle, isBonus = false }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    onToggle(task.id, { x, y });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`task-card ${completed ? 'completed' : ''} ${isBonus ? 'bonus-card' : ''}`}
      aria-pressed={completed}
      aria-label={`${task.label}, ${completed ? 'completed' : 'not completed'}`}
    >
      <div className={`task-checkbox ${completed ? 'checked' : ''}`}>
        {completed ? (
          <svg className="check-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <div className="checkbox-empty" />
        )}
      </div>

      <div className="task-icon-wrapper" aria-hidden="true">
        <span className="task-emoji">{task.icon}</span>
      </div>

      <div className="task-text-content">
        <span className="task-label">{task.label}</span>
        {isBonus && (
          <span className="task-bonus-pill">Bonus Reward ⭐</span>
        )}
      </div>

      <div className="task-status-indicator" aria-hidden="true">
        {completed && <span className="status-sparkle">✨</span>}
      </div>
    </button>
  );
};
