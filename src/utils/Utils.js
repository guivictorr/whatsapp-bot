module.exports = {
  formatDate(date) {
    const formatedDate = new Date(date).toLocaleDateString('pt-br');
    return formatedDate;
  },

  formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  },

  rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
};
