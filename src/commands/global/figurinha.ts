import { Message } from 'whatsapp-web.js';
import client from '../../server';

const figurinha = async (msg: Message): Promise<Message> => {
  try {
    const { id } = await msg.getChat();
    const validTypes = ['image', 'video'];

    if (!msg.hasQuotedMsg) {
      return msg.reply('🤖 Você precisa responder a mensagem com a imagem.');
    }

    const quotedMessage = await msg.getQuotedMessage();

    if (!validTypes.includes(quotedMessage.type)) {
      return msg.reply('🤖 Não encontrei nenhum vídeo/gif/foto');
    }

    client.sendMessage(id._serialized, '🤖 Carregando');
    const media = await quotedMessage.downloadMedia();
    return msg.reply(`Ta ai a figurinha`, id._serialized, {
      media,
      sendMediaAsSticker: true,
    });
  } catch {
    return msg.reply('Error trying to convert to sticker');
  }
};

export default figurinha;
