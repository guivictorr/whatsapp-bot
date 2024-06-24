import { Message } from 'whatsapp-web.js';
import { prisma } from '../../../lib/prisma';

const finishgame = async (
  msg: Message,
  args: string[],
): Promise<void | Message> => {
  const [winnerOption] = args;

  if (winnerOption !== '1' && winnerOption !== '2') {
    return msg.reply('🤖 Identifique o vencedor (1 ou 2)');
  }

  const ongoingGame = await prisma.game.findFirst({
    where: {
      finishedAt: null,
    },
  });

  if (!ongoingGame) {
    return msg.reply('🤖 Não há jogo em andamento');
  }

  const winner =
    winnerOption === '1' ? ongoingGame.firstOption : ongoingGame.secondOption;

  const { _sum: totalBets } = await prisma.bet.aggregate({
    _sum: {
      value: true,
    },
    where: {
      gameId: ongoingGame.id,
    },
  });
  const { _sum: totalWinnerBets } = await prisma.bet.aggregate({
    _sum: {
      value: true,
    },
    where: {
      gameId: ongoingGame.id,
      option: winner,
    },
  });

  if (totalBets.value === null || totalWinnerBets.value === null) {
    return msg.reply('🤖 Não foi possível calcular o resultado');
  }

  const multiplier = totalBets.value / totalWinnerBets.value;

  const winners = await prisma.bet.findMany({
    where: {
      gameId: ongoingGame.id,
      option: winner,
    },
    select: {
      userId: true,
      value: true,
    },
  });

  for (const winner of winners) {
    const { userId, value } = winner;
    const newValue = value * multiplier;
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          increment: newValue,
        },
      },
    });
  }

  await prisma.game.update({
    where: {
      id: ongoingGame.id,
    },
    data: {
      winner,
      finishedAt: new Date(),
    },
  });
  prisma.$disconnect();

  return msg.reply(
    `O jogo foi finalizado\n\nTotal apostado: ${totalBets.value / 100}`,
  );
};

export default finishgame;
