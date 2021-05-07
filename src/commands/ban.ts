import { Message, GroupParticipant, GroupChat } from 'whatsapp-web.js';
import isAdmin from '../utils/isAdmin';

const ban = async (msg: Message): Promise<void | Message> => {
  const chat = (await msg.getChat()) as GroupChat;

  if (!chat.isGroup) {
    return msg.reply('🤖 Comando apenas para grupos.');
  }

  const memberList: GroupParticipant[] = chat.participants;
  const { id } = await msg.getContact();
  const checkAdmin = isAdmin(id, memberList);

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
