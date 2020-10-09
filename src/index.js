const { Client } = require('whatsapp-web.js')
var qrcode = require('qrcode-terminal')
const axios = require('axios').default
const client = new Client()
const questions = require('./data/questions.json')

client.on('qr', qr => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Client is ready! 🎉')
})

client.on('message', msg => {
  if (msg.body === '!eununca') {
    const getRandomInt = max => {
      return Math.floor(Math.random() * Math.floor(max))
    }

    msg.reply(questions[getRandomInt(200)])
  }
})

client.initialize()
