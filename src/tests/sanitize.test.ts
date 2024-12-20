import { sanitize } from '../command-handler';

describe('sanitize', () => {
  it('should return the correct object given a valid message', () => {
    const result = sanitize('!command arg1;arg2');
    expect(result).toEqual({
      args: ['arg1', 'arg2'],
      command: 'command',
    });
  });
  it('should return the correct args', () => {
    const result = sanitize('!command ();[];;123;,.;""');
    expect(result).toEqual({
      args: ['()', '[]', '123', ',.', '""'],
      command: 'command',
    });
  });
  it('should return empty values if the message has the wrong prefix', () => {
    const result = sanitize('/command arg1;arg2');
    expect(result).toEqual({
      args: [],
      command: '',
    });
  });
  it('should return empty array if all args are empty strings', () => {
    const result = sanitize('!command ;;;;;;');
    expect(result).toEqual({
      args: [],
      command: 'command',
    });
  });
  it("should return empty values if there's no prefix", () => {
    const result = sanitize('normal message');
    expect(result).toEqual({
      args: [],
      command: '',
    });
  });
});
