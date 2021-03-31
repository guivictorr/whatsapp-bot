import { Message } from 'whatsapp-web.js';

const figurinha = async (msg: Message): Promise<Message> => {
  const { id } = await msg.getChat();

  if (!msg.hasQuotedMsg) {
    return msg.reply('🤖 Não encontrei imagem');
  }
  const quotedMessage = await msg.getQuotedMessage();

  if (quotedMessage.type !== 'image') {
    return msg.reply('🤖 Não encontrei imagem');
  }

  if (!quotedMessage.hasMedia) {
    return msg.reply(
      '🤖 Não consigo baixar esta imagem\n\n❗ Se a imagem não tem o símbolo de download, o bot não consegue baixar a imagem com uma boa qualidade',
    );
  }

  const media = await quotedMessage.downloadMedia();

  return msg.reply(`Ta ai a figurinha`, id._serialized, {
    media,
    sendMediaAsSticker: true,
  });
};

export default figurinha;
