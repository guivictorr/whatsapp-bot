const client = require('./server');

const commandHandler = require('./commands');

client.on('message_create', commandHandler);
