const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

const sessionFile = path.resolve('src', 'data', 'session.json');

const sessionData = fs.existsSync(sessionFile) ? require(sessionFile) : null;

const client = new Client({
  session: sessionData,
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', session => {
  fs.writeFile(sessionFile, JSON.stringify(session), err => {
    if (err) console.log(err);
  });
});

client.on('ready', () => {
  console.log('Client is ready! 🎉');
});

client.initialize();

module.exports = client;
