const { rand } = require('../utils/utils');
const questions = require('../data/questions.json');

module.exports = (msg, args) => {
  const message = `🤖 ${questions[rand(0, 761)]}`;
  msg.reply(message);
};
