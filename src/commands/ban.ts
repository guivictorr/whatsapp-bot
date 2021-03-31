import { Message, GroupParticipant, GroupChat } from 'whatsapp-web.js';

const ban = async (msg: Message): Promise<void | Message> => {
  const chat = (await msg.getChat()) as GroupChat;
  const memberList: GroupParticipant[] = chat.participants;

  const [bannedUser] = await msg.getMentions();
  const msgContact = await msg.getContact();

  if (!chat.isGroup) {
    return msg.reply('🤖 Comando apenas para grupos.');
  }

  if (!bannedUser) {
    return msg.reply('🤖 Usuário não localizado...');
  }

  const userIndex: number = memberList.findIndex(
    (participant: GroupParticipant) =>
      participant.id.user === msgContact.id.user,
  );

  const isAdmin: boolean = memberList[userIndex].isAdmin;

  if (!isAdmin) {
    return msg.reply('🤖 Só admin pode utilizar o comando...');
  }

  await chat.removeParticipants([bannedUser.id._serialized]);
};

export default ban;
