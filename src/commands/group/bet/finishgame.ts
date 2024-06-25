import { Message } from 'whatsapp-web.js';
import { prisma } from '../../../lib/prisma';

const processPayments = async (gameId: number, winner: string) => {
  const { _sum: totalBets } = await prisma.bet.aggregate({
    _sum: {
      value: true,
    },
    where: {
      gameId,
    },
  });
  const { _sum: totalWinnerBets } = await prisma.bet.aggregate({
    _sum: {
      value: true,
    },
    where: {
      gameId,
      option: winner,
    },
  });

  if (totalBets.value === null || totalWinnerBets.value === null) {
    return null;
  }

  const multiplier = totalBets.value / totalWinnerBets.value;

  const winners = await prisma.bet.findMany({
    where: {
      gameId,
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

  return totalBets.value;
};

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

  const totalBets = await processPayments(ongoingGame.id, winner);

  if (totalBets === null) {
    return msg.reply('🤖 Não foi possível calcular o resultado');
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
    `O jogo foi finalizado\n\nTotal apostado: ${totalBets / 100}`,
  );
};

export default finishgame;
