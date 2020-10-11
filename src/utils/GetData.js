const axios = require('axios').default;

class GetData {
  async getCovidData(sufix) {
    const { data } = await axios.get(
      `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${sufix}`,
    );
    return data;
  }

  async getEconomyData() {
    const { data } = await axios.get(
      'https://economia.awesomeapi.com.br/json/all/USD-BRL,EUR-BRL,BTC-BRL',
    );
    return data;
  }
}

module.exports = new GetData();
