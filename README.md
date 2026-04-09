# Tech Shopping Marketing Monopoly

A modern, single-player adaptation of the classic Monopoly game, reimagined with a tech industry theme. Roll the dice, navigate a board of tech giants and startups, acquire valuable industry properties, and manage your finances to dominate the market.

This game is built with React, TypeScript, and Tailwind CSS and runs entirely in your browser.

## Features

- **Classic Monopoly Gameplay**: Roll dice, move your token, and buy properties.
- **Tech-Themed Board**: Properties are replaced with tech industries (like BFSI, Healthcare, Manufacturing) and valuable domains (like AI, Web3, Gaming).
- **Interactive UI**: A dynamic game board that tracks your token, a player info panel showing your cash and assets, and a central control panel for all your actions.
-**"Draw a Card" Mechanic**: After every roll, you have the choice to draw a random card for a potential bonus or penalty, adding an extra layer of strategy and chance.
- **Cookie & Message Chests**: Themed versions of Community Chest and Chance cards that reflect the ups and downs of the tech world.
- **Game Log**: Keep track of all game events, from dice rolls to property purchases.
- **Avatar Selection**: Choose from a selection of classic game tokens to represent you on the board.
- **Win/Loss Conditions**: The game ends when you own all properties (win) or go bankrupt (lose).

## How to Play

### Objective

The goal is to become the ultimate tech mogul by acquiring every single Industry and Domain property on the board. Avoid bankruptcy to stay in the game!

### Game Setup

1.  The game loads automatically.
2.  Before your first roll, choose your favorite avatar from the "Choose your Avatar" dropdown menu.

### Your Turn

1.  **Roll the Dice**: Click the "Roll Dice" button to start your turn. The dice will roll, and your token will automatically move to the new position on the board.
2.  **Passing GO**: Each time you land on or pass the "GO" square, you will collect a $200 salary.

### After You Move

-   You will always be presented with two options: **"Draw Card"** or **"Skip"**.
    -   **Draw Card**: Clicking this will open a popup with a randomly drawn card. The card's effect (e.g., pay a fine, collect a bonus, move to a new square) is applied after you click "OK".
    -   **Skip**: If you choose to skip, no card is drawn, and the game proceeds to the action for the square you landed on.

### Landing on Squares

-   **Unowned Property** (e.g., "Banking", "AI Domain"): If you have enough cash, you'll see "Buy" and "Pass" buttons. You can purchase the property to add it to your portfolio or pass on the opportunity.
-   **Cookie Chest / Message Chest**: Landing here automatically draws a card from the respective deck (e.g., "Data Breach Fine: Pay $150"). These are separate from the optional card draw after your roll.
-   **Go to Jail**: Your token is moved directly to the "In Jail" square. You do not pass GO and do not collect $200.
-   **In Jail**: To get out of jail, you must roll doubles on your turn. If you fail to roll doubles for three consecutive turns, you will automatically pay a $50 fine and be released on your next turn.
-   **Free Parking / Just Visiting**: These are safe squares. Nothing happens.

### Winning and Losing

-   **You Win**: The game is won when you have successfully purchased all Industry and Domain properties on the board.
-   **You Lose**: You lose the game if your cash amount drops below $0.

## Local Setup & Development

This project is a client-side application and does not require a complex build process to run.

### Prerequisites

-   A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
-   (Optional) A local web server for development to avoid potential issues with browser security policies.

### Running the Game

1.  **Simple Method (No Server)**:
    -   Clone or download this repository.
    -   Open the `index.html` file directly in your web browser.

2.  **Recommended Method (Using a Local Server)**:
    -   A local server provides a more robust development environment.
    -   **Using Python:**
        -   Navigate to the project's root directory in your terminal.
        -   Run `python -m http.server`.
        -   Open your browser and go to `http://localhost:8000`.
    -   **Using Node.js (with `live-server`):**
        -   Install `live-server`: `npm install -g live-server`.
        -   Navigate to the project's root directory in your terminal.
        -   Run `live-server`.
        -   Your browser will automatically open to the correct address.

## Project Structure

```
/
├── components/         # Contains all reusable React components
│   ├── CardPopup.tsx
│   ├── Controls.tsx
│   ├── Dice.tsx
│   ├── GameBoard.tsx
│   ├── PlayerInfo.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   └── useGameReducer.ts # Core game logic and state management
├── App.tsx             # Main application component
├── constants.ts        # Game constants (properties, cards, etc.)
├── index.html          # Main HTML entry point
├── index.tsx           # Root React render script
├── README.md           # This file
└── types.ts            # TypeScript type definitions
```
