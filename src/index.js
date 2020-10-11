const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fun = require('./commands/fun');
const economy = require('./commands/economy');
const info = require('./commands/info');
const client = new Client();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready! 🎉');
});

client.on('message_create', msg => {
  fun(msg);
  economy(msg);
  info(msg);
});

client.initialize();
