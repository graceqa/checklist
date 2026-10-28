import React from 'react';
import { useSchedule } from './hooks/useSchedule';
import { useChecklist } from './hooks/useChecklist';
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
    nextRoutineInfo
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
                      onToggle={toggleTask}
                      isBonus={false}
                    />
                  ))}
                </div>
              </section>

              <BonusSection
                bonusTasks={activeRoutine.bonusTasks}
                allMandatoryCompleted={allMandatoryCompleted}
                completedIds={completedIds}
                onToggle={toggleTask}
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
            ☀️ Morning: 6–8 AM &nbsp;•&nbsp; 🌙 Evening: 4–8:30 PM (Mon–Fri)
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
