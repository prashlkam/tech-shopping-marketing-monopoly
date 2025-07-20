
import React from 'react';
import { useGameReducer } from './hooks/useGameReducer';
import GameBoard from './components/GameBoard';
import PlayerInfo from './components/PlayerInfo';
import Controls from './components/Controls';
import CardPopup from './components/CardPopup';
import { GameActionType } from './types';
import { PROPERTIES, AVATARS } from './constants';

const App: React.FC = () => {
  const [state, dispatch] = useGameReducer();

  const handleRollDice = () => {
    if (state.isRolling || state.gameOver || state.awaitingBuyDecision || state.awaitingCardDrawDecision) return;

    dispatch({ type: GameActionType.START_ROLL });
    
    setTimeout(() => {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      dispatch({ type: GameActionType.END_ROLL, payload: { dice: [die1, die2] } });
    }, 1000);
  };

  const handleBuyProperty = () => {
    dispatch({ type: GameActionType.BUY_PROPERTY });
  };

  const handlePassProperty = () => {
    dispatch({ type: GameActionType.PASS_PROPERTY });
  };
  
  const handleNewGame = () => {
    dispatch({ type: GameActionType.NEW_GAME, payload: { properties: PROPERTIES, avatars: AVATARS } });
  };

  const handleSelectAvatar = (avatarIcon: string) => {
    if (state.turn === 0) {
      dispatch({ type: GameActionType.SELECT_AVATAR, payload: avatarIcon });
    }
  };

  const handleDrawCard = () => {
    dispatch({ type: GameActionType.DECIDE_TO_DRAW_CARD });
  };

  const handleSkipCard = () => {
    dispatch({ type: GameActionType.DECIDE_TO_SKIP_CARD });
  };

  const handleAcknowledgeCard = () => {
    dispatch({ type: GameActionType.ACKNOWLEDGE_CARD });
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col lg:flex-row items-start justify-center p-4 gap-4 font-mono">
      {state.showCardPopup && (
        <CardPopup card={state.lastCardDrawn} onClose={handleAcknowledgeCard} />
      )}
      <main className="flex-grow flex items-center justify-center">
        <GameBoard
          properties={state.properties}
          playerPosition={state.player.position}
          playerAvatar={state.player.avatar}
        />
      </main>
      <aside className="w-full lg:w-96 xl:w-[450px] bg-gray-800 p-4 rounded-lg shadow-2xl flex-shrink-0 space-y-4 border border-cyan-500/20">
        <h1 className="text-3xl font-bold text-cyan-400 text-center tracking-widest">Tech Monopoly</h1>
        <PlayerInfo player={state.player} properties={state.properties} />
        <Controls
          state={state}
          onRollDice={handleRollDice}
          onBuy={handleBuyProperty}
          onPass={handlePassProperty}
          onNewGame={handleNewGame}
          onSelectAvatar={handleSelectAvatar}
          onDrawCard={handleDrawCard}
          onSkipCard={handleSkipCard}
        />
      </aside>
    </div>
  );
};

export default App;
