import fs from 'node:fs';
import path from 'node:path';
import { findCommandPath } from '../command-handler';

const mockDirent = (name: string, isDirectory: boolean = false) => ({
  name: isDirectory ? name : `${name}.ts`,
  isDirectory: () => isDirectory,
  isFile: () => !isDirectory,
  isBlockDevice: () => false,
  isCharacterDevice: () => false,
  isSymbolicLink: () => false,
  isFIFO: () => false,
  isSocket: () => false,
});

// Usage examples:
const mockNestedCommandFolder = mockDirent('nested', true);
const mockCommand = mockDirent('command');

describe('findCommandPath', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return the correct path', () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue([mockCommand]);
    const result = findCommandPath('command');
    expect(result).toEqual({
      path: path.resolve(__dirname, '..', 'commands', 'command.ts'),
    });
  });
  it('should return empty path if is a nested folder instead of a file', () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue([mockNestedCommandFolder]);

    const result = findCommandPath('nested-command');
    expect(result).toEqual({
      path: '',
    });
  });
  it('should return an empty path if no command is found', () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue([mockCommand]);
    const result = findCommandPath('unknown');
    expect(result).toEqual({
      path: '',
    });
  });
});
