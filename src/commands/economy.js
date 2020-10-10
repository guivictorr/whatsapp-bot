const getEconomyData = require('../utils/getEconomyData');

const economy = async msg => {
  if (msg.body === '!cotacao') {
    const data = await getEconomyData();

    const type = currency => {
      return `\n💲 *${currency.name} (${currency.code})* \nValor atual: R$ ${currency.bid} \nValor mais alto: R$ ${currency.high} \nValor mais baixo: R$ ${currency.low}\n`;
    };

    msg.reply(
      `Cotação atual: 💎💰🤑💹 \n${type(data.USD)} ${type(data.EUR)} ${type(
        data.BTC,
      )}`,
    );
  }
};

module.exports = economy;
