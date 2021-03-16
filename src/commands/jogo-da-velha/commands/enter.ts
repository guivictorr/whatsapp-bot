import { Contact, Message } from 'whatsapp-web.js';
import { addPlayer, isOnList } from '../components/playerList';
import { isInProgress } from './start';

const enter = (contact: Contact, msg: Message): void => {
  if (isInProgress) {
    msg.reply(`🤖 Já temos um jogo em progresso`);
    return;
  }

  if (isOnList(contact)) {
    msg.reply(`🤖 ${contact.pushname} já está na lista.`);
    return;
  }

  addPlayer(contact);

  msg.reply(`🤖 ${contact.pushname} entrou na lista.`);
};

export default enter;
