import { Contact } from 'whatsapp-web.js';
import { IPlayerProps } from '../../../types';
import rand from '../../../utils/rand';

const playerList: IPlayerProps[] = [];
const symbols = ['❌', '⭕'];

const handlePlayer = ({ pushname, id, isMe }: Contact): IPlayerProps => {
  let name = pushname;
  const symbol = symbols.pop() as string;
  symbols.unshift(symbol);

  if (isMe) {
    name = 'Guilherme';
  }

  const newPlayer = {
    name,
    id: id._serialized,
    symbol,
  };

  return newPlayer;
};

const isOnList = ({ id }: Contact): boolean => {
  const isOnList = playerList.some(player => id._serialized === player.id);

  return isOnList;
};

const handlePlayerAtList = ({ id }: Contact): IPlayerProps => {
  const playerIndex = playerList.findIndex(
    player => id._serialized === player.id,
  );

  return playerList[playerIndex];
};

const resetPlayerList = (): void => {
  playerList.length = 0;
};

const addPlayer = (contact: Contact): void => {
  const player = handlePlayer(contact);
  playerList.push(player);
};

const handleRandomPlayer = (): IPlayerProps => {
  const randNumber = rand(0, playerList.length);
  const randomPlayer = playerList[randNumber];

  return randomPlayer;
};

export {
  isOnList,
  handlePlayerAtList,
  resetPlayerList,
  addPlayer,
  handleRandomPlayer,
  playerList,
};
