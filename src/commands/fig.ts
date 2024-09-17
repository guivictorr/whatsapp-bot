import { Message, MessageMedia } from 'whatsapp-web.js';
import { BotException } from '../error';
import client from '../server';

const VALID_MEDIA_TYPES = ['image', 'video'];

export default async function fig(msg: Message): Promise<Message> {
  const { id } = await msg.getChat();
  const { media, type } = await getMediaFromMessage(msg);

  if (!VALID_MEDIA_TYPES.includes(type)) {
    throw new BotException('Você precisa usar o comando com uma imagem');
  }

  await client.sendMessage(id._serialized, '🤖 Carregando');

  return msg.reply('Deu xabu', id._serialized, {
    media,
    sendMediaAsSticker: true,
  });
}

async function getMediaFromMessage(
  msg: Message,
): Promise<{ media: MessageMedia; type: string }> {
  if (msg.hasMedia) {
    return { media: await msg.downloadMedia(), type: msg.type };
  }

  if (msg.hasQuotedMsg) {
    const quotedMessage = await msg.getQuotedMessage();
    return {
      media: await quotedMessage.downloadMedia(),
      type: quotedMessage.type,
    };
  }

  throw new BotException('Você precisa usar o comando com uma imagem');
}
