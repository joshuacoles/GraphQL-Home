const music = require('./music.json');

export const addMusic = (name, uri) => music[name] = uri;
export const getMusic = (name) => music[name];
