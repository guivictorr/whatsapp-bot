import client from './server';

import commandHandler from './commands';

client.on('message_create', commandHandler);
