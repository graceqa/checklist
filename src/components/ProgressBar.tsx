import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
  percentage: number;
  allCompleted: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  completed,
  total,
  percentage,
  allCompleted
}) => {
  return (
    <div className="progress-section">
      <div className="progress-header">
        <div className="progress-label-group">
          <span className="progress-title">Today's Routine</span>
          <span className="progress-count">
            <strong>{completed}</strong> of {total} completed
          </span>
        </div>
        <div className={`progress-badge ${allCompleted ? 'complete' : ''}`}>
          {allCompleted ? '🎉 100% Complete!' : `${percentage}%`}
        </div>
      </div>

      <div className="progress-track" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={`progress-fill ${allCompleted ? 'complete' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {allCompleted && (
        <div className="unlock-banner-pill">
          <span className="banner-icon">🔓</span>
          <span className="banner-text">All items checked! Scroll down for your Bonus Activity!</span>
        </div>
      )}
    </div>
  );
};
