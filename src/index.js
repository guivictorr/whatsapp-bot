const client = require('./server');
const { cotacao } = require('./commands/economy');
const { eununca, xinga } = require('./commands/fun');
const { covid } = require('./commands/info');

client.on('message_create', msg => {
  cotacao(msg);
  eununca(msg);
  xinga(msg);
  covid(msg);
});
