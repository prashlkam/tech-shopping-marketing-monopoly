import React from 'react';
import { Player, Property, PropertyType } from '../types';
import { AVATARS } from '../constants';

interface PlayerInfoProps {
  player: Player;
  properties: Property[];
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, properties }) => {
  const avatarName = AVATARS.find(a => a.icon === player.avatar)?.name || 'Player';
  const owned = player.ownedProperties
    .map(id => properties.find(p => p.id === id))
    .filter((p): p is Property => p !== undefined && (p.type === PropertyType.INDUSTRY || p.type === PropertyType.DOMAIN));

  return (
    <div className="bg-gray-700/50 p-4 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            role="img"
            aria-label={`${avatarName} avatar`}
            className="w-16 h-16 rounded-full border-2 border-cyan-400 bg-gray-900 flex items-center justify-center text-4xl"
          >
            {player.avatar}
          </div>
          <div>
            <div className="text-xl font-bold text-green-400">${player.cash.toLocaleString()}</div>
            {player.inJail && <div className="text-sm text-red-400 font-semibold">IN JAIL</div>}
          </div>
        </div>
        {player.hasGetOutOfJailCard && (
          <div className="text-xs bg-yellow-500 text-gray-900 font-bold p-1 rounded">
            Jail Card
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-cyan-400 mb-2">Owned Properties ({owned.length})</h3>
        <div className="h-32 overflow-y-auto bg-gray-800/50 p-2 rounded-md space-y-1 pr-2">
          {owned.length > 0 ? (
            owned.map(prop => (
              <div key={prop.id} className="flex items-center justify-between text-sm bg-gray-700 p-1.5 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-4 rounded-sm" style={{ backgroundColor: prop.color || '#888' }}></div>
                  <span>{prop.name}</span>
                </div>
                <span className="text-gray-400">${prop.price}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 pt-8">No properties owned yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;