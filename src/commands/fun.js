const questions = require('../data/questions.json');
const rand = require('../utils/randomNumber');

const fun = msg => {
  if (msg.body === '!eununca') {
    msg.reply(`🤖 ${questions[rand(0, 477)]}`);
    return;
  }
  if (msg.body === '!eununca pesadão') {
    msg.reply(`🤖 ${questions[rand(477, 761)]}`);
    return;
  }
  if (msg.body.startsWith('!xinga')) {
    const sufix = msg.body.split('!xinga')[1];
    msg.reply(`Vai toma no seu cu *${sufix.trim()}*`);
    return;
  }
};

module.exports = fun;
