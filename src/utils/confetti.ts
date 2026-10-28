import confetti from 'canvas-confetti';

export function fireBonusUnlockedConfetti(): void {
  // Center blast
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
  });

  // Delayed side cannons
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 }
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 }
    });
  }, 200);
}

export function fireTaskDoneConfetti(x = 0.5, y = 0.5): void {
  confetti({
    particleCount: 25,
    spread: 40,
    origin: { x, y },
    ticks: 150,
    gravity: 1.2,
    scalar: 0.8
  });
}
