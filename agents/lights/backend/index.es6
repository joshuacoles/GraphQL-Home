import { HueApi } from 'node-hue-api'
import { ip, username } from './creds.json'
import R from 'ramda'
import _ from 'lodash'

const api = new HueApi(ip, username);

export const fetchLight = (_, { id }) => api.lightStatus(id).then(R.merge({ id }));
export const fetchGroup = (_, { id }) => api.group(id);
export const fetchAllLights = () => api.lights().then(({ lights }) => lights);
export const fetchAllGroups = () => api.groups()
                                       .then(([_, ...groups]) => Promise.all([api.group(0), Promise.resolve(groups)]))
                                       .then(([first, rest]) => [first, ...rest]);

export function editLight(_, { id, ...props }) {
    return fetchLight(_, { id })
        .then(state => api.setLightState(id, colourManager.toLightState(state, props)))
        .then(() => props.name ? api.setLightName(id, props.name) : undefined)
        .then(() => fetchLight(_, { id }));
}

export function editLightsInGroup(_, { groupId, ...props }) {
    return api.setLightState(groupId, colourManager.toLightState(props))
              .then(() => api.group(id));
}

export function createGroup(_, { name, lights }) {
    return api.createGroup(name, lights);
}

export function editGroup(_, { id, name, lights }) {
    if (id === 0) throw new Error("Cannot edit group 0");

    return api.updateGroup(id, name, lights)
              .then(() => api.group(id));
}

export function deleteGroup(_, { id }) {
    if (id === 0) throw new Error("Cannot edit group 0");

    return fetchGroup(_, { id })
        .done(_ => api.deleteGroup(id));
}

export function addLights(i1, { id, lights }) {
    if (id === 0) throw new Error("Cannot edit group 0");

    return api.group(id)
              .then(({ currLights }) => api.updateGroup(id, _.uniq(currLights, lights)))
              .then(() => api.group(id));
}

export function removeLights(i1, { id, lights }) {
    if (id === 0) throw new Error("Cannot edit group 0");

    return api.group(id)
              .then(({ currLights }) => api.updateGroup(id, _.difference(currLights, lights)))
              .then(() => api.group(id));
}
