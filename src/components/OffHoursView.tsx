import React from 'react';
import { NextRoutineInfo } from '../types';

interface OffHoursViewProps {
  currentDate: Date;
  isWeekday: boolean;
  nextRoutine: NextRoutineInfo;
}

export const OffHoursView: React.FC<OffHoursViewProps> = ({
  currentDate,
  isWeekday,
  nextRoutine
}) => {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  }).format(currentDate);

  const formattedDay = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(currentDate);

  return (
    <div className="off-hours-container">
      <div className="off-hours-hero">
        <div className="off-hours-illustration">🌿</div>
        <h2 className="off-hours-title">Checklist Resting</h2>
        <p className="off-hours-subtitle">
          {isWeekday
            ? "Your routine will automatically appear here during scheduled hours."
            : "It's the weekend! Take time to relax and recharge."}
        </p>
        <div className="off-hours-time-tag">
          {formattedDay} • {formattedTime}
        </div>
      </div>

      {/* Next scheduled routine countdown card */}
      <div className="next-routine-card">
        <div className="next-routine-header">
          <span className="next-routine-label">UPCOMING ROUTINE</span>
          <span className="next-countdown-badge">starts in {nextRoutine.countdown}</span>
        </div>
        <div className="next-routine-details">
          <div className="next-routine-title">{nextRoutine.name}</div>
          <div className="next-routine-time">Scheduled for {nextRoutine.targetTimeFormatted}</div>
        </div>
      </div>

      {/* Routine schedule rules reference */}
      <div className="schedule-rules-card">
        <h4 className="rules-heading">Active Routine Hours (Weekdays)</h4>
        <div className="schedule-rule-row">
          <div className="rule-badge morning">☀️ Morning Routine</div>
          <div className="rule-time">5:00 AM – 8:00 AM</div>
        </div>
        <div className="schedule-rule-row">
          <div className="rule-badge evening">🌙 Evening Routine</div>
          <div className="rule-time">3:30 PM – 9:00 PM</div>
        </div>
      </div>
    </div>
  );
};
