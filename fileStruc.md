# 🏹 ROGUE ARCHER — GAME JS STRUCTURE

```text
javascript/
│
├── homePage.js
├── gamePage.js
├── guidePage.js
├── shopPage.js
├── statPage.js
│
└── game/
    ├── canvas.js
    ├── gameState.js
    ├── hero.js
    ├── enemy.js
    ├── arrows.js
    ├── input.js
    ├── collision.js
    ├── storage.js
    └── pickups.js
```

## 📂 File Responsibilities

| File | Responsibility |
|---|---|
| `homePage.js` | Homepage navigation and player information |
| `gamePage.js` | Main game controller, game loop, updates, rendering, and controls |
| `guidePage.js` | Guide page interactions and navigation |
| `shopPage.js` | Shop purchases, coins, and item unlocking |
| `statPage.js` | Displays player statistics |
| `canvas.js` | Canvas initialization and drawing context |
| `gameState.js` | Shared game variables, score, kills, timers, and game status |
| `hero.js` | Hero drawing, health, and damage handling |
| `enemy.js` | Enemy drawing, spawning, movement, and health |
| `arrows.js` | Player and enemy arrow creation, movement, and rendering |
| `input.js` | Mouse controls, aiming, and shooting input |
| `collision.js` | Collision detection, hitboxes, damage, and pickup collection |
| `storage.js` | Saving and loading supported game data using LocalStorage |
| `pickups.js` | Health and arrow pickup spawning and rendering |

## ⚙️ Game Architecture

- **Controller:** `gamePage.js` coordinates the game modules and runs the main game loop.
- **Rendering:** `canvas.js`, `hero.js`, `enemy.js`, and `arrows.js` handle canvas setup and drawing.
- **Gameplay:** `input.js`, `collision.js`, and `pickups.js` handle player interaction, combat, and collectible items.
- **State & Persistence:** `gameState.js` manages shared runtime variables, while `storage.js` handles browser-based saving and loading.
- **Page Navigation:** The page-specific JavaScript files manage interactions outside the core game engine.
