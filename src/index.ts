import commandHandler from './commands';
import client from './server';

client.on('message_create', commandHandler);
