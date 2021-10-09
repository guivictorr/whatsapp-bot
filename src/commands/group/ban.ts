import { Message, GroupChat } from 'whatsapp-web.js';
import isAdmin from '../../utils/isAdmin';

const ban = async (msg: Message): Promise<void | Message> => {
  const chat = (await msg.getChat()) as GroupChat;

  const checkAdmin = await isAdmin(msg);

  if (!checkAdmin) {
    return msg.reply('🤖 Só admin pode utilizar o comando...');
  }

  const targetIds = msg.mentionedIds;

  if (!targetIds.length) {
    return msg.reply('🤖 Usuário não localizado...');
  }

  await chat.removeParticipants(targetIds);
};

export default ban;
