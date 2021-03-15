import { Message } from 'whatsapp-web.js';

const figurinha = async (msg: Message): Promise<void> => {
  const { id } = await msg.getChat();

  if (!msg.hasQuotedMsg) {
    msg.reply('🤖 Não encontrei imagem');
    return;
  }
  const quotedMessage = await msg.getQuotedMessage();

  if (quotedMessage.type !== 'image') {
    msg.reply('🤖 Não encontrei imagem');
    return;
  }

  if (!quotedMessage.hasMedia) {
    msg.reply(
      '🤖 Não consigo baixar esta imagem\n\n❗ Se a imagem não tem o símbolo de download, o bot não consegue baixar a imagem com uma boa qualidade',
    );
    return;
  }

  const media = await quotedMessage.downloadMedia();

  msg.reply(`Ta ai a figurinha`, id._serialized, {
    media,
    sendMediaAsSticker: true,
  });
};

export default figurinha;
