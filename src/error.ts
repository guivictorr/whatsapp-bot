export class BotException extends Error {
  constructor(message: string) {
    super();
    this.name = 'BotException';
    this.message = `🤖 ${message}`;

    // This line is necessary for proper stack trace in TypeScript
    Object.setPrototypeOf(this, BotException.prototype);
  }
}
