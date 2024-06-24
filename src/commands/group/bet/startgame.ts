import { Message } from 'whatsapp-web.js';
import { prisma } from '../../../lib/prisma';

function slugify(string: string) {
  return string
    .normalize('NFD')
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}

const startgame = async (
  msg: Message,
  args: string[],
): Promise<void | Message> => {
  const [description, ...options] = args;
  const slugifiedOptions = options.map(slugify);

  if (options.length !== 2) {
    return msg.reply('🤖 Um jogo deve ter duas opções');
  }

  prisma.$connect();

  const ongoingGame = await prisma.game.findFirst({
    where: {
      finishedAt: null,
    },
  });

  if (ongoingGame) {
    return msg.reply('🤖 Um jogo já está em andamento');
  }

  const newGame = await prisma.game.create({
    data: {
      description,
      firstOption: slugifiedOptions[0],
      secondOption: slugifiedOptions[1],
      winner: '',
    },
  });
  const { firstOption, secondOption } = newGame;

  return msg.reply(
    `${description}\n\n1. ${firstOption}\n2. ${secondOption}\n30 segundos para apostar`,
  );
};

export default startgame;
