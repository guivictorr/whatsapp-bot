import { sanitize } from '../command-handler';

describe('sanitize', () => {
  it('should return the correct object given a valid message', () => {
    const result = sanitize('!command arg1;arg2');
    expect(result).toEqual({
      args: ['arg1', 'arg2'],
      command: 'command',
    });
  });
});
