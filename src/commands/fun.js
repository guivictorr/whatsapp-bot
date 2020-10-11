const questions = require('../data/questions.json');
const { rand } = require('../utils/Utils');

class FunCommands {
  async eununca(msg) {
    if (msg.body === '!eununca') {
      msg.reply(`🤖 ${questions[rand(0, 761)]}`);
      return;
    }
  }

  xinga(msg) {
    if (msg.body.startsWith('!xinga')) {
      const sufix = msg.body.split('!xinga')[1];
      msg.reply(`Vai toma no seu cu *${sufix.trim()}*`);
      return;
    }
  }
}

module.exports = new FunCommands();
