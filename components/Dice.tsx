
import React from 'react';

interface DiceProps {
  die1: number;
  die2: number;
  isRolling: boolean;
}

const Die: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg border-2 border-gray-300">
      <span className="text-2xl font-bold text-black">{value}</span>
    </div>
  );
};

const Dice: React.FC<DiceProps> = ({ die1, die2, isRolling }) => {
  const rollingClass = isRolling ? 'animate-spin' : '';
  
  return (
    <div className="flex gap-2">
      <div className={rollingClass}><Die value={isRolling ? Math.floor(Math.random() * 6) + 1 : die1} /></div>
      <div className={rollingClass}><Die value={isRolling ? Math.floor(Math.random() * 6) + 1 : die2} /></div>
    </div>
  );
};

export default Dice;
