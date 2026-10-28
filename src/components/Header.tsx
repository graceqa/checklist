import React, { useState } from 'react';
import { RoutineConfig } from '../types';

interface HeaderProps {
  routine: RoutineConfig | null;
  currentDate: Date;
  onReset: () => void;
  hasItemsChecked: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  routine,
  currentDate,
  onReset,
  hasItemsChecked
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(currentDate);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  }).format(currentDate);

  const handleResetClick = () => {
    if (showConfirmReset) {
      onReset();
      setShowConfirmReset(false);
    } else {
      setShowConfirmReset(true);
      setTimeout(() => setShowConfirmReset(false), 4000);
    }
  };

  return (
    <header className="app-header">
      {/* Top live clock and reset row */}
      <div className="header-top-row">
        <div className="live-clock-badge">
          <span className="live-dot" />
          <span className="date-str">{formattedDate}</span>
          <span className="clock-divider">•</span>
          <span className="time-str">{formattedTime}</span>
        </div>

        {hasItemsChecked && (
          <button
            type="button"
            className={`reset-button ${showConfirmReset ? 'confirming' : ''}`}
            onClick={handleResetClick}
            title="Reset checks"
          >
            {showConfirmReset ? 'Confirm Reset?' : 'Reset'}
          </button>
        )}
      </div>

      {/* Active routine banner */}
      {routine && (
        <div className="routine-banner">
          <div className="routine-icon-circle">
            <span className="routine-icon">{routine.icon}</span>
          </div>
          <div className="routine-info">
            <div className="routine-badge-row">
              <span className="schedule-badge">{routine.badge}</span>
              <span className="window-badge">{routine.timeWindowLabel}</span>
            </div>
            <h1 className="routine-title">{routine.title}</h1>
            <p className="routine-subtitle">{routine.subtitle}</p>
          </div>
        </div>
      )}
    </header>
  );
};
