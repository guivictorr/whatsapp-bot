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

const mockNestedCommandFolder = mockDirent('nested', true);
const mockNestedCommand = mockDirent('nested-command', false);
const mockCommand = mockDirent('command', false);

describe('findCommandPath', () => {
  beforeAll(() => {
    const mockFiles = new Map();

    mockFiles.set(path.resolve(__dirname, '..', 'commands'), [
      mockCommand,
      mockNestedCommandFolder,
    ]);
    mockFiles.set(
      path.resolve(__dirname, '..', 'commands', mockNestedCommandFolder.name),
      [mockNestedCommand],
    );

    jest.spyOn(fs, 'readdirSync').mockImplementation(dirPath => {
      const files = mockFiles.get(dirPath);
      return files;
    });
  });

  it('should return the correct path', () => {
    const result = findCommandPath('command');
    expect(result.path).toBe(
      path.resolve(__dirname, '..', 'commands', 'command.ts'),
    );
  });
  it('should search commands recursively through nested folders', () => {
    const result = findCommandPath('nested-command');
    expect(result.path).toBe(
      path.resolve(__dirname, '..', 'commands', 'nested', 'nested-command.ts'),
    );
  });
  it('should return an empty path if no command is found', () => {
    const result = findCommandPath('unknown');
    expect(result.path).toBe('');
  });
});
