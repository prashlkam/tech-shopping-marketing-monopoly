
import React from 'react';
import { Card } from '../types';

interface CardPopupProps {
  card: Card | null;
  onClose: () => void;
}

const CardPopup: React.FC<CardPopupProps> = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        aria-modal="true"
        role="dialog"
    >
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 m-4 max-w-sm w-full border-2 border-yellow-400 transform transition-all animate-in fade-in-0 zoom-in-95">
        <h2 className="text-2xl font-bold text-yellow-300 text-center mb-4">Card Drawn!</h2>
        <div className="bg-yellow-100 text-gray-900 p-6 rounded-md mb-6 min-h-[100px] flex items-center justify-center">
            <p className="text-center font-semibold text-lg italic">"{card.text}"</p>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CardPopup;
