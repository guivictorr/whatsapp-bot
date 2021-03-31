import { Contact, Message } from 'whatsapp-web.js';
import { addPlayer, isOnList } from '../components/playerList';
import { isInProgress } from './start';

const enter = (contact: Contact, msg: Message): Promise<Message> => {
  if (isInProgress) {
    return msg.reply(`🤖 Já temos um jogo em progresso`);
  }

  if (isOnList(contact)) {
    return msg.reply(`🤖 ${contact.pushname} já está na lista.`);
  }

  addPlayer(contact);

  return msg.reply(`🤖 ${contact.pushname} entrou na lista.`);
};

export default enter;
