
import React from 'react';
import { Property, SpecialSquareType } from '../types';

interface SpecialSquareProps {
  property: Property;
}

const SpecialSquare: React.FC<SpecialSquareProps> = ({ property }) => {
    const renderIcon = () => {
        switch (property.specialType) {
            case SpecialSquareType.GO: return '🏁';
            case SpecialSquareType.JAIL: return '👮';
            case SpecialSquareType.FREE_PARKING: return '🅿️';
            case SpecialSquareType.GO_TO_JAIL: return '🚔';
            case SpecialSquareType.COOKIE_CHEST: return '🍪';
            case SpecialSquareType.MESSAGE_CHEST: return '💬';
            default: return 'X';
        }
    }

  return (
    <div className="w-full h-full bg-gray-800 border border-gray-600 flex flex-col items-center justify-center p-1 text-center text-xs">
        <div className="text-3xl">{renderIcon()}</div>
        <div className="font-bold uppercase break-words leading-tight">{property.name}</div>
    </div>
  );
};

export default SpecialSquare;
