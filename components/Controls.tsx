
import React from 'react';
import { GameState } from '../types';
import { AVATARS } from '../constants';
import Dice from './Dice';

interface ControlsProps {
  state: GameState;
  onRollDice: () => void;
  onBuy: () => void;
  onPass: () => void;
  onNewGame: () => void;
  onSelectAvatar: (icon: string) => void;
  onDrawCard: () => void;
  onSkipCard: () => void;
}

const Controls: React.FC<ControlsProps> = ({ state, onRollDice, onBuy, onPass, onNewGame, onSelectAvatar, onDrawCard, onSkipCard }) => {
  const { isRolling, gameOver, awaitingBuyDecision, awaitingCardDrawDecision, dice, gameLog, turn, player } = state;

  return (
    <div className="bg-gray-700/50 p-4 rounded-lg space-y-4">
      {/* Avatar Selection */}
      {turn === 0 && !gameOver && (
        <div className="flex flex-col">
            <label htmlFor="avatar-select" className="block text-sm font-medium text-gray-300 mb-1">Choose your Avatar:</label>
            <select
                id="avatar-select"
                value={player.avatar}
                onChange={(e) => onSelectAvatar(e.target.value)}
                className="bg-gray-900 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            >
            {AVATARS.map(avatar => (
                <option key={avatar.name} value={avatar.icon}>
                {avatar.icon} {avatar.name}
                </option>
            ))}
            </select>
        </div>
      )}

      {/* Dice & Roll Button */}
      <div className="flex items-center justify-between gap-4">
        <Dice die1={dice[0]} die2={dice[1]} isRolling={isRolling} />
        <button
          onClick={onRollDice}
          disabled={isRolling || gameOver || awaitingBuyDecision || awaitingCardDrawDecision}
          className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>

      {/* Card Draw Decision */}
      {awaitingCardDrawDecision && !gameOver && (
        <div className="border-t-2 border-b-2 border-yellow-400/50 py-4 text-center space-y-3">
          <p className="font-semibold text-yellow-200">You've moved! Care to draw a card?</p>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={onDrawCard} className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
              Draw Card
            </button>
            <button onClick={onSkipCard} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Skip
            </button>
          </div>
        </div>
      )}
      
      {/* Game Log */}
      <div className="h-28 bg-gray-900/70 p-2 rounded-md overflow-y-auto text-sm space-y-1">
        {gameLog.slice().reverse().map((msg, index) => (
          <p key={index} className="text-gray-300">{msg}</p>
        ))}
      </div>
      
      {/* Last Card Drawn (from Chests) */}
      {state.lastCardDrawn && !state.showCardPopup && (
        <div className="bg-yellow-200 text-gray-800 p-3 rounded-lg border-2 border-yellow-400">
            <p className="font-bold text-center">Card Drawn!</p>
            <p className="text-center italic">"{state.lastCardDrawn.text}"</p>
        </div>
      )}

      {/* Buy/Pass Buttons */}
      {awaitingBuyDecision && !gameOver && (
        <div className="grid grid-cols-2 gap-4">
          <button onClick={onBuy} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Buy</button>
          <button onClick={onPass} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Pass</button>
        </div>
      )}
      
      {/* Game Over Screen */}
      {gameOver && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">{state.gameWon ? "🎉 You Won! 🎉" : "💀 Game Over 💀"}</h2>
          <p>{state.gameWon ? "You've successfully cornered the tech market!" : "You've gone bankrupt!"}</p>
          <button onClick={onNewGame} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Controls;
