import { Message } from 'whatsapp-web.js';
import { prisma } from '../../../lib/prisma';
import slugify from 'slugify';

const startgame = async (
  msg: Message,
  args: string[],
): Promise<void | Message> => {
  const [description, ...options] = args;
  const slugifiedOptions = options.map(option =>
    slugify(option, { locale: 'pt' }),
  );

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
    `${description}\n\n1. ${firstOption}\n2. ${secondOption}\n30 segundos para apostar\n\n!bet 1 ou 2;valor`,
  );
};

export default startgame;
