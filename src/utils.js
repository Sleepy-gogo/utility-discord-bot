import 'dotenv/config';

const VARIANT = process.env.VARIANT;

const replacementMap = {
  a: 'ᴀ',
  b: 'ʙ',
  c: 'ᴄ',
  d: 'ᴅ',
  e: 'ᴇ',
  f: 'ꜰ',
  g: 'ɢ',
  h: 'ʜ',
  i: 'ɪ',
  j: 'ᴊ',
  k: 'ᴋ',
  l: 'ʟ',
  m: 'ᴍ',
  n: 'ɴ',
  o: 'ᴏ',
  p: 'ᴘ',
  q: 'ϙ',
  r: 'ʀ',
  s: 'ꜱ',
  t: 'ᴛ',
  u: 'ᴜ',
  v: 'ᴠ',
  w: 'ᴡ',
  x: 'x',
  y: 'ʏ',
  z: 'ᴢ'
};

export const formatText = (text) =>
  text
    .toLowerCase()
    .split('')
    .map((letter) => replacementMap[letter] || letter)
    .join('');

const estilos = {
  texto: {
    amay: (text, emoji) => `┊「${emoji}」${text}`,
    yeriiko: (text, emoji) => `${emoji}｜${text}`
  },
  voz: {
    amay: (text, emoji) => `${emoji} × ${text}`,
    yeriiko: (text, emoji) => `「${emoji}」${text}`
  }
};

export const tipos = {
  GLOBAL: 1,
  GUILD: 2
};

export const getChannelName = estilos.texto[VARIANT];
export const getVoiceChannelName = estilos.voz[VARIANT];
