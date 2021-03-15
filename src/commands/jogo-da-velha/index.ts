import { Message, Contact } from 'whatsapp-web.js';
import { IPlayerProps, IBoardKeys } from '../../types';
import rand from '../../utils/rand';

let isInProgress = false;
let currentPlayer = '';
const playerList: IPlayerProps[] = [];
const symbols = ['❌', '⭕'];

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

export const board = {
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

const markBoard = (position: IBoardKeys, { symbol }: IPlayerProps) => {
  board[position] = symbol;
};

const validateMove = (position: IBoardKeys) => {
  return board[position] === '⬜';
};

const checkWin = ({ symbol }: IPlayerProps) => {
  let markCount: number;

  for (const combination of winCombinations) {
    markCount = 0;
    for (const position of combination) {
      if (board[position as IBoardKeys] === symbol) {
        markCount++;
      }

      if (markCount === 3) {
        return true;
      }
    }
  }

  return false;
};

const checkTie = () => {
  const boardKeys = Object.keys(board);

  for (const key of boardKeys) {
    const newKey = Number(key) as IBoardKeys;

    if (board[newKey] === '⬜') {
      return false;
    }
  }

  return true;
};

const reset = () => {
  isInProgress = false;
  currentPlayer = '';
  playerList.length = 0;
  symbols.push('❌', '⭕');
  const resetedBoard = {
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

  Object.assign(board, resetedBoard);
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

  const randNumber = rand(0, playerList.length);
  const randomPlayer = playerList[randNumber];
  currentPlayer = randomPlayer.id;
  printBoard(randomPlayer, msg);
};

const playTurn = (player: IPlayerProps, position: IBoardKeys, msg: Message) => {
  if (!isInProgress) {
    msg.reply(`🤖 O jogo ainda não começou`);
    return;
  }

  if (currentPlayer !== player.id) {
    msg.reply('🤖 Não é sua vez');
    return;
  }

  const nextPlayer = playerList.findIndex(p => p.id !== player.id);

  currentPlayer = playerList[nextPlayer].id;

  if (validateMove(position)) {
    markBoard(position, player);
    printBoard(playerList[nextPlayer], msg);

    if (checkWin(player)) {
      msg.reply(`🎉 Parabéns ${player.name} você venceu`);
      reset();
      return;
    }

    if (checkTie()) {
      msg.reply(`👵 Deu velha`);
      reset();
      return;
    }
  } else {
    msg.reply(`❌ Movimento inválido, tente novamente.`);
    return;
  }
};

// Command

const velha = async (msg: Message, args: string[]): Promise<void> => {
  const chat = await msg.getChat();

  if (chat.isGroup) {
    return;
  }

  const sufix = args[1];
  const position = Number(args[2]) as IBoardKeys;
  const contact = await msg.getContact();
  const player = handlePlayerAtList(contact);

  switch (sufix) {
    case 'entrar':
      enter(contact, msg);
      break;
    case 'começar':
      start(msg);
      break;
    case 'jogar':
      playTurn(player, position, msg);
      break;
  }
};

export default velha;
