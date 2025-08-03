
import { useReducer } from 'react';
import { GameState, GameAction, GameActionType, Player, Property, Card, CardAction, PropertyType, SpecialSquareType } from '../types';
import { INITIAL_CASH, PASS_GO_SALARY, PROPERTIES, CARDS, JAIL_POSITION, GO_TO_JAIL_POSITION, AVATARS } from '../constants';

// Helper function to process the consequences of landing on a square
function processLanding(state: GameState): GameState {
    let newState = { ...state };
    let player = { ...newState.player };
    let log: string[] = [];

    const landedOn = newState.properties[player.position];
    log.push(`You landed on ${landedOn.name}.`);

    let awaitingBuy = false;
    let activePropertyId: number | undefined = undefined;

    // Handle landing on a property/special square
    switch (landedOn.type) {
        case PropertyType.INDUSTRY:
        case PropertyType.DOMAIN:
            if (!player.ownedProperties.includes(landedOn.id)) {
                awaitingBuy = true;
                activePropertyId = landedOn.id;
            } else {
                // No rent/maintenance in this version for simplicity on self-owned property
            }
            break;
        case PropertyType.SPECIAL:
            switch (landedOn.specialType) {
                case SpecialSquareType.GO_TO_JAIL:
                    player.position = JAIL_POSITION;
                    player.inJail = true;
                    log.push('You are now in jail!');
                    break;
                case SpecialSquareType.COOKIE_CHEST:
                case SpecialSquareType.MESSAGE_CHEST:
                    const deckType = landedOn.specialType === SpecialSquareType.COOKIE_CHEST ? 'cookies' : 'messages';
                    const deck = CARDS[deckType];
                    const card = deck[Math.floor(Math.random() * deck.length)];
                    log.push(`You drew a ${deckType === 'cookies' ? 'Cookie' : 'Message'} card from the board: "${card.text}"`);
                    newState.lastCardDrawn = card;
              
                    switch(card.action) {
                        case CardAction.PAY:
                            player.cash -= card.amount || 0;
                            break;
                        case CardAction.COLLECT:
                            player.cash += card.amount || 0;
                            break;
                        case CardAction.MOVE_TO:
                            if(card.moveTo !== undefined) {
                                if (card.moveTo < player.position) {
                                    player.cash += PASS_GO_SALARY;
                                    log.push(`You passed GO and collected $${PASS_GO_SALARY}.`);
                                }
                                player.position = card.moveTo;
                            }
                            break;
                        case CardAction.GO_TO_JAIL:
                            player.position = JAIL_POSITION;
                            player.inJail = true;
                            break;
                        case CardAction.GET_OUT_OF_JAIL:
                            player.hasGetOutOfJailCard = true;
                            break;
                    }
                    break;
            }
            break;
    }

    newState = {
        ...newState,
        player,
        awaitingBuyDecision: awaitingBuy,
        activePropertyId,
        gameLog: [...newState.gameLog, ...log]
    };
    
    // Check for game over/win conditions
    if (newState.player.cash < 0) {
        newState.gameOver = true;
        newState.gameWon = false;
        newState.gameLog.push('You have gone bankrupt! Game Over.');
    }
    
    const allProperties = PROPERTIES.filter(p => p.type === PropertyType.INDUSTRY || p.type === PropertyType.DOMAIN);
    if (allProperties.every(p => newState.player.ownedProperties.includes(p.id))) {
        newState.gameOver = true;
        newState.gameWon = true;
        newState.gameLog.push('You own all properties! You win!');
    }

    return newState;
}


const createInitialState = (): GameState => ({
  player: {
    position: 0,
    cash: INITIAL_CASH,
    ownedProperties: [],
    inJail: false,
    jailTurns: 0,
    hasGetOutOfJailCard: false,
    avatar: AVATARS[0].icon,
  },
  properties: JSON.parse(JSON.stringify(PROPERTIES)), // Deep copy
  dice: [1, 1],
  turn: 0,
  gameLog: ['Welcome to Tech Shopping Marketing Monopoly! Select your avatar and roll the dice.'],
  isRolling: false,
  awaitingBuyDecision: false,
  awaitingCardDrawDecision: false,
  showCardPopup: false,
  activePropertyId: undefined,
  gameOver: false,
  gameWon: false,
  lastCardDrawn: null,
});

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GameActionType.NEW_GAME:
      return createInitialState();

    case GameActionType.SELECT_AVATAR:
        return {
            ...state,
            player: { ...state.player, avatar: action.payload }
        };

    case GameActionType.START_ROLL:
      return { ...state, isRolling: true, awaitingBuyDecision: false, lastCardDrawn: null };

    case GameActionType.END_ROLL: {
      let newState = { ...state, isRolling: false, dice: action.payload.dice };
      const [die1, die2] = action.payload.dice;
      const totalRoll = die1 + die2;
      
      let log: string[] = [`You rolled a ${die1} and a ${die2} (Total: ${totalRoll}).`];
      let player = { ...newState.player };

      // Handle Jail
      if (player.inJail) {
        if (die1 === die2) {
          player.inJail = false;
          player.jailTurns = 0;
          log.push('You rolled doubles! You are out of jail.');
        } else {
          player.jailTurns++;
          if (player.jailTurns >= 3) {
            player.inJail = false;
            player.jailTurns = 0;
            player.cash -= 50;
            log.push('You did not roll doubles for 3 turns. You pay $50 and are out of jail.');
          } else {
            log.push(`You are in jail. Turn ${player.jailTurns} of 3.`);
            return { ...newState, player, gameLog: [...state.gameLog, ...log], turn: state.turn + 1 };
          }
        }
      }

      const newPosition = (player.position + totalRoll) % PROPERTIES.length;

      if (newPosition < player.position && !player.inJail) {
        player.cash += PASS_GO_SALARY;
        log.push(`You passed GO and collected $${PASS_GO_SALARY}.`);
      }
      player.position = newPosition;
      
      return {
          ...newState,
          player,
          gameLog: [...state.gameLog, ...log],
          turn: state.turn + 1,
          awaitingCardDrawDecision: true,
      };
    }

    case GameActionType.DECIDE_TO_DRAW_CARD: {
        const combinedDeck = [...CARDS.cookies, ...CARDS.messages];
        const card = combinedDeck[Math.floor(Math.random() * combinedDeck.length)];

        return {
            ...state,
            awaitingCardDrawDecision: false,
            showCardPopup: true,
            lastCardDrawn: card,
            gameLog: [...state.gameLog, 'You chose to draw a card.']
        };
    }

    case GameActionType.DECIDE_TO_SKIP_CARD: {
        const newState = {
            ...state,
            awaitingCardDrawDecision: false,
            gameLog: [...state.gameLog, 'You decided not to draw a card.']
        };
        return processLanding(newState);
    }
    
    case GameActionType.ACKNOWLEDGE_CARD: {
        let newState = { ...state, showCardPopup: false };
        let player = { ...newState.player };
        const card = newState.lastCardDrawn;
        let log: string[] = [];

        if(card) {
            log.push(`Card effect applied: "${card.text}"`);
            switch(card.action) {
                case CardAction.PAY:
                    player.cash -= card.amount || 0;
                    break;
                case CardAction.COLLECT:
                    player.cash += card.amount || 0;
                    break;
                case CardAction.MOVE_TO:
                    if(card.moveTo !== undefined) {
                        if (card.moveTo < player.position && !player.inJail) {
                            player.cash += PASS_GO_SALARY;
                            log.push(`Card makes you pass GO. Collected $${PASS_GO_SALARY}.`);
                        }
                        player.position = card.moveTo;
                    }
                    break;
                case CardAction.GO_TO_JAIL:
                    player.position = JAIL_POSITION;
                    player.inJail = true;
                    break;
                case CardAction.GET_OUT_OF_JAIL:
                    player.hasGetOutOfJailCard = true;
                    break;
            }
        }
        
        newState.player = player;
        newState.gameLog = [...newState.gameLog, ...log];
        
        return processLanding(newState);
    }

    case GameActionType.BUY_PROPERTY: {
        const property = state.properties.find(p => p.id === state.activePropertyId);
        if (!property || !property.price || state.player.cash < property.price) {
            return { ...state, awaitingBuyDecision: false, gameLog: [...state.gameLog, 'You cannot afford this property.'] };
        }
        
        const player = { ...state.player };
        player.cash -= property.price;
        // Ensure the property is not already owned before adding it
        if (!player.ownedProperties.includes(property.id)) {
            player.ownedProperties.push(property.id);
        }

        let newState = {
            ...state,
            player,
            awaitingBuyDecision: false,
            gameLog: [...state.gameLog, `You bought ${property.name} for $${property.price}.`],
        };

        // Check for win condition immediately after buying
        const allProperties = PROPERTIES.filter(p => p.type === PropertyType.INDUSTRY || p.type === PropertyType.DOMAIN);
        if (allProperties.every(p => newState.player.ownedProperties.includes(p.id))) {
            newState.gameOver = true;
            newState.gameWon = true;
            newState.gameLog.push('You own all properties! You win!');
        }

        return newState;
    }

    case GameActionType.PASS_PROPERTY: {
        const property = state.properties.find(p => p.id === state.activePropertyId);
        return {
            ...state,
            awaitingBuyDecision: false,
            gameLog: [...state.gameLog, `You decided not to buy ${property?.name}.`],
        };
    }
    
    default:
      return state;
  }
}

export const useGameReducer = () => {
  return useReducer(gameReducer, createInitialState());
};
