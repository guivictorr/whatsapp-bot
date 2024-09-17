import { Message } from 'whatsapp-web.js';
import { BotException } from '../error';
import client from '../server';

const figurinha = async (msg: Message): Promise<Message> => {
  const { id } = await msg.getChat();
  const validTypes = ['image', 'video'];

  if (!msg.hasQuotedMsg) {
    throw new BotException('Você precisa responder a mensagem com a imagem.');
  }

  const quotedMessage = await msg.getQuotedMessage();

  if (!validTypes.includes(quotedMessage.type)) {
    throw new BotException('Não encontrei nenhum vídeo,gif ou foto');
  }

  client.sendMessage(id._serialized, '🤖 Carregando');
  const media = await quotedMessage.downloadMedia();
  return msg.reply(`Ta ai a figurinha`, id._serialized, {
    media,
    sendMediaAsSticker: true,
  });
};

export default figurinha;
