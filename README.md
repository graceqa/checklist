Live site: https://github.com/graceqa/checklist
morning list demo: https://github.com/graceqa/checklist/demo/morning
evening list demo: https://github.com/graceqa/checklist/demo/evening

# Daily Checklist ☀️🌙

A simple, mobile-optimized daily routine checklist built with React, Vite, and TypeScript. Automatically surfaces the appropriate morning or evening checklist based on the time of day, keeps progress in session memory, and unlocks bonus activities when all mandatory tasks are completed.

## 🕒 Routine Schedule

- **☀️ Morning Routine:** Weekdays (Monday – Friday) between **5:00 AM – 8:00 AM**
- **🌙 Evening Routine:** Weekdays (Monday – Friday) between **3:30 PM – 9:00 PM**
- **🌿 Off-Hours / Weekends:** Displays a restful screen with a countdown to the next scheduled routine.

---

## 📋 Checklist Tasks (from `to do list.pdf`)

### Morning Routine (5:00 AM – 8:00 AM)
1. Drink water
2. Change
3. Eat breakfast
4. Put dishes/cups away
5. Brush teeth
6. Get watch
7. Pack snacks
8. Water bottle
9. Turn off all the lights

**Morning Bonus Tasks (Unlocked when 9/9 items are complete):**
- ChessKids
- Read

---

### Evening Routine (3:30 PM – 9:00 PM)
1. Charge watch
2. Do homework
3. Eat dinner
4. Violin
5. Read for 30 minutes
6. Take a shower
7. Floss and brush teeth
8. Put everything I need in backpack
9. Get everything I need for bed

**Evening Bonus Task (Unlocked when 9/9 items are complete):**
- TV

---

## ✨ Key Features

- **Mobile First Design:** Large, tactile cards that act as checkbox tap targets (>= 58px) with audio chimes and smooth checkmark animations.
- **In-Session State:** Progress is kept during the active session. If the page is refreshed or the active time window expires, progress resets cleanly.
- **Bonus Unlocks:** Bonus rewards are locked until all 9 routine tasks are checked off. Completing all 9 tasks triggers celebratory confetti bursts and fanfare audio.
- **Dynamic Theming:** Warm sunrise amber theme for the morning; cozy twilight indigo theme for the evening.

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run unit tests
npm test

# Build production bundle
npm run build
```
