const questions = require('../data/questions.json')
const rand = require('../utils/randomNumber')

const euNunca = msg => {
  if (msg.body === '!eununca') {
    msg.reply(`🤖 ${questions[rand(0, 477)]}`)
    return
  }
  if (msg.body === '!eununca pesadão') {
    msg.reply(`🤖 ${questions[rand(477, 761)]}`)
    return
  }
}

module.exports = euNunca
