import { Message, Contact } from 'whatsapp-web.js';
import rand from '../utils/rand';

type IPlayerProps = {
  name: string;
  id: string;
  symbol: string;
};

type IBoardKeys = keyof typeof board;

const playerList: IPlayerProps[] = [];
let isInProgress = false;
const winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
const board = {
  1: '⬜',
  2: '⬜',
  3: '⬜',
  4: '⬜',
  5: '⬜',
  6: '⬜',
  7: '⬜',
  8: '⬜',
  9: '⬜',
};

// Utility Functions

const handlePlayer = ({ pushname, id, isMe }: Contact): IPlayerProps => {
  const symbols = ['❌', '⭕'];
  let name = pushname;
  const symbol = symbols.pop() as string;

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

const isOnList = ({ id }: Contact) => {
  const isOnList = playerList.some(player => id._serialized === player.id);

  return isOnList;
};

const handlePlayerAtList = ({ id }: Contact): IPlayerProps => {
  const playerIndex = playerList.findIndex(
    player => id._serialized === player.id,
  );

  return playerList[playerIndex];
};

const printBoard = ({ name, symbol }: IPlayerProps, msg: Message) => {
  msg.reply(
    `Agora é sua vez *${name}* (${symbol})\n\n${board[1]}${board[2]}${board[3]}\n${board[4]}${board[5]}${board[6]}\n${board[7]}${board[8]}${board[9]}\n`,
  );
};
// Sub Commands

const enter = (contact: Contact, msg: Message) => {
  if (isInProgress) {
    msg.reply(`🤖 Já temos um jogo em progresso`);
    return;
  }

  const player = handlePlayer(contact);

  if (isOnList(contact)) {
    msg.reply(`🤖 ${player.name} já está na lista.`);
    return;
  }

  playerList.push(player);

  msg.reply(`🤖 ${player.name} entrou na lista.`);
};

const start = (msg: Message) => {
  if (playerList.length !== 2) {
    msg.reply(`🤖 Aguardando... (${playerList.length} de 2)`);
    return;
  }

  if (isInProgress) {
    msg.reply(`🤖 Já temos um jogo em progresso`);
    return;
  }

  isInProgress = true;

  const randomPlayer = playerList[rand(0, playerList.length)];
  printBoard(randomPlayer, msg);
};

// Command

const velha = async (msg: Message, args: string[]): Promise<void> => {
  const chat = await msg.getChat();

  if (chat.isGroup) {
    return;
  }

  const sufix = args[1];
  const contact = await msg.getContact();

  switch (sufix) {
    case 'entrar':
      enter(contact, msg);
      break;
    case 'começar':
      start(msg);
      break;
  }
};

export default velha;
