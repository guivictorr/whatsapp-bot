import { Message } from 'whatsapp-web.js';

const figurinha = async (msg: Message): Promise<Message> => {
  const { id } = await msg.getChat();
  const validTypes = ['image', 'video'];

  if (!msg.hasQuotedMsg) {
    return msg.reply('🤖 Não encontrei imagem');
  }
  const quotedMessage = await msg.getQuotedMessage();

  if (!validTypes.includes(quotedMessage.type)) {
    return msg.reply('🤖 Não encontrei imagem');
  }

  if (!quotedMessage.hasMedia) {
    return msg.reply('🤖 Não consigo baixar esta imagem');
  }

  const media = await quotedMessage.downloadMedia();
  return msg.reply(`Ta ai a figurinha`, id._serialized, {
    media,
    sendMediaAsSticker: true,
  });
};

export default figurinha;
