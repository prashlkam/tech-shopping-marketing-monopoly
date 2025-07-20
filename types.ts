
export enum PropertyType {
  INDUSTRY = 'INDUSTRY',
  DOMAIN = 'DOMAIN',
  SPECIAL = 'SPECIAL',
}

export enum SpecialSquareType {
  GO = 'GO',
  JAIL = 'JAIL',
  FREE_PARKING = 'FREE_PARKING',
  GO_TO_JAIL = 'GO_TO_JAIL',
  COOKIE_CHEST = 'COOKIE_CHEST',
  MESSAGE_CHEST = 'MESSAGE_CHEST',
}

export interface Property {
  id: number;
  name: string;
  type: PropertyType;
  price?: number;
  maintenanceFee?: number;
  color?: string;
  specialType?: SpecialSquareType;
  image?: string;
}

export enum CardAction {
  PAY = 'PAY',
  COLLECT = 'COLLECT',
  MOVE_TO = 'MOVE_TO',
  GET_OUT_OF_JAIL = 'GET_OUT_OF_JAIL',
  GO_TO_JAIL = 'GO_TO_JAIL',
}

export interface Card {
  text: string;
  action: CardAction;
  amount?: number;
  moveTo?: number;
}

export interface Player {
  position: number;
  cash: number;
  ownedProperties: number[];
  inJail: boolean;
  jailTurns: number;
  hasGetOutOfJailCard: boolean;
  avatar: string;
}

export interface GameState {
  player: Player;
  properties: Property[];
  dice: [number, number];
  turn: number;
  gameLog: string[];
  isRolling: boolean;
  awaitingBuyDecision: boolean;
  awaitingCardDrawDecision: boolean;
  showCardPopup: boolean;
  activePropertyId?: number;
  gameOver: boolean;
  gameWon: boolean;
  lastCardDrawn: Card | null;
}

export enum GameActionType {
    SELECT_AVATAR = 'SELECT_AVATAR',
    START_ROLL = 'START_ROLL',
    END_ROLL = 'END_ROLL',
    BUY_PROPERTY = 'BUY_PROPERTY',
    PASS_PROPERTY = 'PASS_PROPERTY',
    NEW_GAME = 'NEW_GAME',
    DECIDE_TO_DRAW_CARD = 'DECIDE_TO_DRAW_CARD',
    DECIDE_TO_SKIP_CARD = 'DECIDE_TO_SKIP_CARD',
    ACKNOWLEDGE_CARD = 'ACKNOWLEDGE_CARD',
}

export type GameAction =
  | { type: GameActionType.SELECT_AVATAR; payload: string }
  | { type: GameActionType.START_ROLL }
  | { type: GameActionType.END_ROLL; payload: { dice: [number, number] } }
  | { type: GameActionType.BUY_PROPERTY }
  | { type: GameActionType.PASS_PROPERTY }
  | { type: GameActionType.NEW_GAME; payload: { properties: Property[], avatars: {name: string, icon: string}[] } }
  | { type: GameActionType.DECIDE_TO_DRAW_CARD }
  | { type: GameActionType.DECIDE_TO_SKIP_CARD }
  | { type: GameActionType.ACKNOWLEDGE_CARD };
