import { generateChars } from 'zero-dependency'

export const PREVIEW_TEXT = [
  ...generateChars('А', 'Я'),
  ...generateChars('а', 'я'),
  ...generateChars('a', 'z'),
  ...generateChars('A', 'Z'),
  ...generateChars('!', '?')].join(' ')

export const INITIAL_FONT = 'russo-one'
