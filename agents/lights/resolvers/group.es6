import { fetchLight } from '../backend/index';

export const lights = ({ lights }) => Promise.all(lights.map(id => fetchLight(null, { id })));
export const type = native => native.type;
