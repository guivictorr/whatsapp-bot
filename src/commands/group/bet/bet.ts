import { Message } from 'whatsapp-web.js';
import { prisma } from '../../../lib/prisma';

// !bet 1;100
const bet = async (msg: Message, args: string[]): Promise<void | Message> => {
  const contact = await msg.getContact();
  const userName = contact.name ?? contact.id.user;
  const userId = contact.id._serialized;
  const [selectedOption, amount] = args;
  const betAmount = Number(amount) * 100; // bet in cents;

  if (args.length !== 2) {
    return msg.reply('🤖 Escolha uma opção e o valor da aposta');
  }

  if (isNaN(betAmount)) {
    return msg.reply('🤖 Valor da aposta inválido');
  }

  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        name: userName,
      },
    });
  }

  if (user.balance < betAmount) {
    return msg.reply(
      `🤖 Saldo insuficiente. ${user.balance / 100} < ${betAmount / 100}`,
    );
  }

  const ongoingGame = await prisma.game.findFirst({
    where: {
      finishedAt: null,
    },
    include: {
      bets: {
        where: {
          userId,
        },
      },
    },
  });

  if (!ongoingGame) {
    return msg.reply('🤖 Nenhum jogo em andamento');
  }

  if (ongoingGame.bets.length >= 1) {
    return msg.reply('🤖 Você já fez uma aposta');
  }

  const selectedOptionSlug =
    selectedOption === '1' ? ongoingGame.firstOption : ongoingGame.secondOption;

  await prisma.bet.create({
    data: {
      value: betAmount,
      option: selectedOptionSlug,
      gameId: ongoingGame.id,
      userId,
    },
  });

  await prisma.user.update({
    data: {
      balance: user.balance - betAmount,
    },
    where: { id: userId },
  });

  return msg.reply(
    `🤖 Você apostou ${betAmount / 100} na opção ${selectedOptionSlug}`,
  );
};

export default bet;
