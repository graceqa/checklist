import React from 'react';
import { TaskItem } from '../types';
import { TaskCard } from './TaskCard';

interface BonusSectionProps {
  bonusTasks: TaskItem[];
  allMandatoryCompleted: boolean;
  completedIds: Set<string>;
  onToggle: (taskId: string, clickCoordinates?: { x: number; y: number }) => void;
  remainingCount: number;
}

export const BonusSection: React.FC<BonusSectionProps> = ({
  bonusTasks,
  allMandatoryCompleted,
  completedIds,
  onToggle,
  remainingCount
}) => {
  if (bonusTasks.length === 0) return null;

  return (
    <div className={`bonus-section ${allMandatoryCompleted ? 'unlocked' : 'locked'}`}>
      <div className="bonus-header">
        <div className="bonus-title-group">
          <div className="bonus-sparkle-icon">
            {allMandatoryCompleted ? '🎁' : '🔒'}
          </div>
          <div>
            <h3 className="bonus-title">
              {allMandatoryCompleted ? 'Bonus Unlocked!' : 'Bonus Activities'}
            </h3>
            <p className="bonus-subtitle">
              {allMandatoryCompleted
                ? 'Super work! You finished all your routine tasks.'
                : `Complete ${remainingCount} more ${remainingCount === 1 ? 'task' : 'tasks'} to unlock:`}
            </p>
          </div>
        </div>
      </div>

      {allMandatoryCompleted ? (
        <div className="bonus-tasks-list">
          {bonusTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              completed={completedIds.has(task.id)}
              onToggle={onToggle}
              isBonus={true}
            />
          ))}
        </div>
      ) : (
        <div className="bonus-locked-card">
          <div className="locked-preview-items">
            {bonusTasks.map((task) => (
              <div key={task.id} className="locked-item-pill">
                <span className="locked-padlock">🔒</span>
                <span className="locked-icon">{task.icon}</span>
                <span className="locked-name">{task.label}</span>
              </div>
            ))}
          </div>
          <div className="locked-hint">
            ⭐️ Finish all items in your checklist above to open this reward!
          </div>
        </div>
      )}
    </div>
  );
};
