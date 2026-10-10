# 🏹 The Rogue Archer — My 25-Day Development Journey

## 🧠 Key Learnings

Throughout this project, I learned five important principles:

1. **Planning before execution** — a clear plan makes development easier.
2. **Consistency matters** — small improvements every day add up.
3. **Start simple, then add complexity** — build a working foundation before adding advanced features.
4. **Break problems into smaller parts** — complex systems become manageable when divided into minimal tasks.
5. **Debugging is part of learning** — understanding and fixing mistakes is as important as writing code.

---

## 📅 Development Timeline

### Day 1–2: Starting the Project
- Created the initial project file structure.
- Built the homepage and guide page.
- Established the visual direction for the game.

**Learning:** Start with a simple foundation instead of trying to build everything at once.

### Day 3: Planning and Navigation
- Improved the project structure.
- Planned how the different pages would connect.
- Implemented navigation links between pages.

**Learning:** Better planning creates clarity and reduces confusion during implementation.

### Day 4: Designing the Pages
- Built the basic layouts for the Stats, Shop, and Guide pages.
- Used AI assistance for CSS styling.
- Started making the interface visually consistent.

**Learning:** AI can accelerate UI development, but the developer still needs to understand and refine the output.

### Day 5: Designing the Game Page
- Created the game-page layout.
- Worked on consistent UI styling.
- Made design decisions for the shop interface.
- Planned the implementation of the core game logic.

**Learning:** Separating UI design from gameplay logic makes the project easier to manage.

### Day 6: Learning the Canvas API
- Studied the HTML Canvas API.
- Prepared to draw and animate game elements using JavaScript.

**Learning:** Understanding the underlying technology is essential before building complex interactions.

### Day 7–8: Building the Core Game
Dedicated full days to implementing the fundamental game mechanics.

**Game architecture:**

```text
GAME
│
├── State
│   ├── Hero
│   ├── Enemy
│   ├── Arrow
│   └── Enemy Arrow
│
├── Input
│   ├── Mouse Movement
│   ├── Mouse Down
│   └── Mouse Up
│
├── Update
│   ├── Aiming
│   ├── Arrow Movement
│   ├── Gravity
│   └── Enemy Shooting Timer
│
├── Collision
│   ├── Head
│   └── Body
│
├── Drawing
│   ├── Hero
│   ├── Enemy
│   ├── Arrows
│   └── Aim Line
│
└── Game Loop
    └── Update → Draw → Repeat
```

**Core combat flow:**

```text
PLAYER
   ↓
AIM
   ↓
SHOOT
   ↓
ARROW FLIES
   ↓
COLLISION
   ↓
┌─────────────┬─────────────┐
│  HEADSHOT   │   BODY HIT  │
│      ↓      │      ↓      │
│ ENEMY DEATH │   -25 HP    │
└─────────────┴─────────────┘
        ↓
   ENEMY DEFEATED
        ↓
   SPAWN NEW ENEMY
        ↓
   RANDOM POSITION
        ↓
      REPEAT
```

Meanwhile, enemy arrows can damage the player, reduce health, and eventually trigger Game Over.

**Learning:** A game becomes easier to implement when its state, input, updates, collisions, rendering, and game loop are designed separately.

### Day 9: Managing Game State
- Connected score, coins, and kills to the game state.
- Displayed gameplay values in the UI.
- Debugged synchronization between game logic and the interface.

**Learning:** The UI should reflect the actual game state rather than maintain separate, inconsistent values.

### Day 10: LocalStorage
- Implemented browser-based data persistence.
- Started saving supported game information between visits.

**Learning:** Persistent data introduces new edge cases that must be handled carefully.

### Day 11–14: Making the Enemy More Realistic
Focused on improving enemy behavior through a simple AI system.

The enemy AI was designed around three behaviors:

- **Imperfect aim:** the enemy can miss the player.
- **Accuracy-based aim:** accuracy determines the amount of aiming error.
- **Variable attack timing:** shooting intervals vary instead of remaining constant.

**Enemy AI flow:**

```text
ENEMY AI
   ↓
Find the Hero's Position
   ↓
Calculate X/Y Difference
   ↓
Calculate Perfect Angle
   ↓
Apply Accuracy-Based Random Error
   ↓
Calculate Arrow Velocity
   ↓
Shoot
   ↓
Reset Shooting Timer
   ↓
Choose Random Cooldown
   ↓
Wait 1.5–3 Seconds
   ↓
Shoot Again
```

**Learning:** Simple, controlled randomness can make an opponent feel less predictable without requiring an overly complicated AI system.

### Day 15–16: Iteration and Debugging
- Continued refining gameplay behavior and resolving implementation issues.

**Learning:** Features rarely work perfectly on the first attempt; testing and iteration are part of development.

### Day 17–18: Shop, Stats, and Game Controls
- Developed the Shop and Stats pages.
- Added the in-game restart button.
- Worked on the settings menu and restart behavior.
- Fixed an issue with restarting the game from Settings.

**Learning:** Individual features may work correctly on their own but still fail when integrated with other parts of the application.

### Day 19: Refinement
- Continued testing and improving existing functionality.

### Day 20: Game Mechanics and Persistence Fixes
- Fixed an issue involving health pickups.
- Improved gameplay fairness.
- Resolved a LocalStorage-related bug.
- Decided to postpone music implementation.

**Learning:** Improving reliability and gameplay balance can be more valuable than continuously adding new features.

### Day 21: Arrow UI and Power-Ups
- Added UI elements for arrows.
- Experimented with arrow-collision and enemy-death UI feedback, then removed those additions.
- Added UI for pickups and power-ups.

**Learning:** Not every feature improves the player experience. Sometimes removing unnecessary UI makes the game clearer.

### Day 22: Hero Visual Design
- Improved the hero's appearance with a themed outfit.

**Learning:** Character visuals contribute to the identity and atmosphere of a game.

### Day 23: Enemy Visual Design
- Redesigned the enemy to match the fantasy theme.
- Added a delay after enemy death to improve the transition before the next enemy appears.

**Learning:** Visual consistency and well-timed transitions make gameplay feel more polished.

### Day 24: UI and LocalStorage Refinement
- Improved the overall UI.
- Refined LocalStorage logic and game-data handling.

**Learning:** Persistence needs to be considered throughout the project, not just when saving data is first implemented.

### Day 25: Final UI Refinements and Debugging
- Continued improving consistency across the interface.
- Debugged existing features.
- Focused on polishing the overall experience.

**Learning:** The final stage of a project is about making existing features work together reliably.

---

## 💡 My Biggest Takeaways

Building The Rogue Archer taught me that development is not just about writing code. It is about breaking down problems, making deliberate decisions, testing assumptions, and improving the product through iteration.

The most important lessons I took away were:

- Plan the structure before implementing complex logic.
- Build a small working version before expanding it.
- Keep related responsibilities separated into modules.
- Treat debugging as a normal part of the process.
- Use AI as a development aid while retaining ownership of technical decisions.
- Prioritize a reliable, understandable product over unnecessary complexity.

## 🏁 Outcome

Over this development journey, I worked on a multi-page browser game featuring mouse-controlled archery, arrow physics, enemy AI, collision detection, health and pickups, scoring, a shop, statistics, and browser-based persistence.

More importantly, I developed a better understanding of how to turn a large idea into smaller, testable components and bring them together into a working project.

**The Rogue Archer was not just about building a game — it was about learning how to build software, one step at a time.**
