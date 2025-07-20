
import React from 'react';
import { Property, PropertyType } from '../types';
import { AVATARS } from '../constants';
import PropertySquare from './PropertySquare';
import SpecialSquare from './SpecialSquare';

interface GameBoardProps {
  properties: Property[];
  playerPosition: number;
  playerAvatar: string;
}

const GameBoard: React.FC<GameBoardProps> = ({ properties, playerPosition, playerAvatar }) => {
  const avatarName = AVATARS.find(a => a.icon === playerAvatar)?.name || 'Player';
  // This is a more direct mapping for a standard 40-square board
  const getBoardCoordinates = (position: number) => {
      if (position <= 10) return { row: 10, col: 10 - position };
      if (position <= 20) return { row: 10 - (position - 10), col: 0 };
      if (position <= 30) return { row: 0, col: position - 20 };
      if (position <= 40) return { row: position - 30, col: 10 };
      return { row: 10, col: 10 };
  }

  const grid: (Property | null)[][] = Array.from({ length: 11 }, () => Array(11).fill(null));

  properties.forEach((prop) => {
      const { row, col } = getBoardCoordinates(prop.id);
      if (row !== undefined && col !== undefined) {
          grid[row][col] = prop;
      }
  });


  return (
    <div className="relative">
        <div className="grid grid-cols-11 grid-rows-11 gap-0.5 bg-gray-900 p-2 rounded-lg border-4 border-cyan-700 shadow-lg" style={{width: '768px', height: '768px'}}>
        {grid.map((row, rowIndex) =>
            row.map((property, colIndex) => {
                // Render center
                if (rowIndex === 1 && colIndex === 1) {
                    return (
                        <div
                            key="center-image-container"
                            className="col-start-2 col-span-9 row-start-2 row-span-9 flex items-center justify-center rounded-md border-2 border-cyan-700/50 overflow-hidden relative"
                            style={{
                                backgroundImage: 'url(https://storage.googleapis.com/genai-assets/monopoly/monopoly-man-tech.jpeg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 bg-black/50"></div>
                            <h1 className="relative text-6xl lg:text-7xl font-extrabold tracking-wider transform -rotate-45 select-none text-center leading-tight drop-shadow-lg">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                                    TECH
                                </span>
                                <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-l from-cyan-400 via-purple-500 to-pink-500">
                                    MONOPOLY
                                </span>
                            </h1>
                        </div>
                    );
                }
                
                // Skip other center cells
                if (rowIndex > 0 && rowIndex < 10 && colIndex > 0 && colIndex < 10) {
                    return null;
                }

                const playerOnSquare = getBoardCoordinates(playerPosition).row === rowIndex && getBoardCoordinates(playerPosition).col === colIndex;
            
                if (property) {
                    return (
                    <div key={`${rowIndex}-${colIndex}`} className="relative">
                        {property.type === PropertyType.SPECIAL ? (
                        <SpecialSquare property={property} />
                        ) : (
                        <PropertySquare property={property} />
                        )}
                        {playerOnSquare && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                            <div className="text-4xl animate-bounce drop-shadow-lg" role="img" aria-label={`${avatarName} token`}>
                                {playerAvatar}
                            </div>
                        </div>
                        )}
                    </div>
                    );
                }
                
                return <div key={`${rowIndex}-${colIndex}`} className="bg-transparent"></div>;
            })
        )}
        </div>
    </div>
  );
};

export default GameBoard;