const { default: Axios } = require('axios');

const axios = require('axios').default;

const getEconomyData = async () => {
  const response = await axios.get(
    'https://economia.awesomeapi.com.br/json/all/USD-BRL,EUR-BRL,BTC-BRL',
  );
  const data = await response.data;
  return data;
};

module.exports = getEconomyData;
