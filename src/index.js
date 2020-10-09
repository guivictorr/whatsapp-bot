const { Client } = require('whatsapp-web.js')
var qrcode = require('qrcode-terminal')
const client = new Client()
const questions = require('./data/questions.json')

const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)

client.on('qr', qr => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Client is ready! 🎉')
})

client.on('message', msg => {
  if (msg.body === '!eununca') msg.reply(questions[rand(0, 477)])
  if (msg.body === '!eununca pesadão') msg.reply(questions[rand(477, 761)])
})

client.initialize()
