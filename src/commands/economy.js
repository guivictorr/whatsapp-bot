const getEconomyData = require('../utils/getEconomyData');

const economy = async msg => {
  if (msg.body === '!cotacao') {
    const data = await getEconomyData();

    const formatNumber = number => {
      return Number(number).toFixed(2);
    };

    const type = currency => {
      return `\n💲 *${currency.name} (${
        currency.code
      })* \nValor atual: R$ ${formatNumber(
        currency.bid,
      )} \nValor mais alto: R$ ${formatNumber(
        currency.high,
      )} \nValor mais baixo: R$ ${formatNumber(currency.low)}\n`;
    };

    msg.reply(
      `Cotação atual: 💎💰🤑💹 \n${type(data.USD)} ${type(data.EUR)} ${type(
        data.BTC,
      )}`,
    );
    return;
  }
};

module.exports = economy;
