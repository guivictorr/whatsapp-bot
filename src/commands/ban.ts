import { Message, GroupParticipant, GroupChat } from 'whatsapp-web.js';

const ban = async (msg: Message): Promise<void | Message> => {
  const chat = (await msg.getChat()) as GroupChat;

  if (!chat.isGroup) {
    return msg.reply('🤖 Comando apenas para grupos.');
  }

  const memberList: GroupParticipant[] = chat.participants;
  const msgContact = await msg.getContact();

  const userIndex = memberList.findIndex(
    (participant: GroupParticipant) =>
      participant.id.user === msgContact.id.user,
  );

  const isAdmin = memberList[userIndex].isAdmin;

  if (!isAdmin) {
    return msg.reply('🤖 Só admin pode utilizar o comando...');
  }

  const [bannedUser] = await msg.getMentions();

  if (!bannedUser) {
    return msg.reply('🤖 Usuário não localizado...');
  }

  await chat.removeParticipants([bannedUser.id._serialized]);
};

export default ban;
