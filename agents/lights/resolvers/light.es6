import { fullColourOf } from '../backend/colourManager';

export const state = native => native.state.on;
export const brightness = native => Math.round((native.state.bri / 255) * 100);
export const reachable = native => native.state.reachable;
export const colour = fullColourOf;
