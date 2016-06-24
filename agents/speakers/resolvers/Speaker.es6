export const name = native => native.roomName;
export const id = native => native.id;

export const muted = native => native.state.mute;
export const playing = native => native.playerState === 'PLAYING';
export const volume = native => native.state.volume;
export const queue = native => ({});
