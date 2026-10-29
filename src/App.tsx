import React, { useCallback } from 'react';
import { useSchedule } from './hooks/useSchedule';
import { useChecklist } from './hooks/useChecklist';
import { useWakeLock } from './hooks/useWakeLock';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { TaskCard } from './components/TaskCard';
import { BonusSection } from './components/BonusSection';
import { OffHoursView } from './components/OffHoursView';

export const App: React.FC = () => {
  const {
    currentDate,
    isWeekday,
    activeRoutineType,
    activeRoutine,
    nextRoutineInfo,
    isDemo
  } = useSchedule();

  const {
    completedIds,
    toggleTask,
    isTaskCompleted,
    allMandatoryCompleted,
    completedMandatoryCount,
    totalMandatoryCount,
    percentage,
    resetRoutine
  } = useChecklist(activeRoutine);

  // Keep screen awake while a checklist is active/being worked on
  const { isActive: isWakeLockActive, requestWakeLock } = useWakeLock(Boolean(activeRoutine));

  const handleTaskToggle = useCallback((taskId: string, coords?: { x: number; y: number }) => {
    // Acquire/refresh wake lock on user interaction
    requestWakeLock();
    toggleTask(taskId, coords);
  }, [requestWakeLock, toggleTask]);

  const themeClass = activeRoutineType ? `theme-${activeRoutineType}` : 'theme-offhours';
  const hasItemsChecked = completedIds.size > 0;
  const remainingCount = totalMandatoryCount - completedMandatoryCount;

  return (
    <div className={`app-shell ${themeClass}`}>
      <div className="mobile-viewport-container">
        <Header
          routine={activeRoutine}
          currentDate={currentDate}
          onReset={resetRoutine}
          hasItemsChecked={hasItemsChecked}
          isDemo={isDemo}
          isWakeLockActive={isWakeLockActive}
        />

        <main className="app-main-content">
          {activeRoutine ? (
            <div className="routine-content-view">
              <ProgressBar
                completed={completedMandatoryCount}
                total={totalMandatoryCount}
                percentage={percentage}
                allCompleted={allMandatoryCompleted}
              />

              <section className="tasks-section" aria-label="Routine tasks">
                <div className="section-title-row">
                  <h2 className="section-heading">Checklist Items</h2>
                  <span className="items-counter">
                    {completedMandatoryCount}/{totalMandatoryCount}
                  </span>
                </div>

                <div className="task-items-list" role="list">
                  {activeRoutine.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      completed={isTaskCompleted(task.id)}
                      onToggle={handleTaskToggle}
                      isBonus={false}
                    />
                  ))}
                </div>
              </section>

              <BonusSection
                bonusTasks={activeRoutine.bonusTasks}
                allMandatoryCompleted={allMandatoryCompleted}
                completedIds={completedIds}
                onToggle={handleTaskToggle}
                remainingCount={remainingCount}
              />
            </div>
          ) : (
            <OffHoursView
              currentDate={currentDate}
              isWeekday={isWeekday}
              nextRoutine={nextRoutineInfo}
            />
          )}
        </main>

        <footer className="app-footer">
          <p className="footer-schedule-note">
            ☀️ Morning: 5–8 AM &nbsp;•&nbsp; 🌙 Evening: 3:30–9 PM (Mon–Fri)
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
