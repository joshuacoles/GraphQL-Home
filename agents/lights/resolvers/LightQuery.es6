import * as service from "../backend";

export const light = service.fetchLight;
export const group = service.fetchGroup;
export const lights = service.fetchAllLights;
export const groups = service.fetchAllGroups;
