module.exports = (msg, args) => {
  const sufix = args.toString().replace(/,/g, ' ');
  const message = `Vai toma no seu cu *${sufix}*`;

  msg.reply(message);
};
