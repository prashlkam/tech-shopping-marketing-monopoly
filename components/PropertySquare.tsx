
import React from 'react';
import { Property } from '../types';

interface PropertySquareProps {
  property: Property;
}

const PropertySquare: React.FC<PropertySquareProps> = ({ property }) => {
  return (
    <div className="w-full h-full bg-gray-800 border border-gray-600 flex flex-col justify-between p-1 text-center text-[10px] leading-tight font-sans">
      <div className="h-4 w-full -mx-1 -mt-1 rounded-t-sm" style={{ backgroundColor: property.color || '#888' }}></div>
      <div className="font-bold uppercase flex-grow flex items-center justify-center">{property.name}</div>
      <div className="font-semibold text-cyan-400">${property.price}</div>
    </div>
  );
};

export default PropertySquare;
