import SonosDiscovery from 'sonos-discovery'
import Group from './Group'
import genUUID from 'uuid'
import '../../../lib/util'

const discovery = new SonosDiscovery();
const internalGroups = new Map();

export const speaker = (root, { name, uuid }) => fetchSpeaker(name || uuid);
export const editSpeaker = (root, props) => speaker(root, props).edit(props);

export const speakers = (root) => discovery.getZones()
                                           .map(x => discovery.getPlayerByUUID(x.uuid));

export const group = (root, { uuid }) => internalGroups.get(uuid);
export const groups = (root) => Array.from(internalGroups.values());

export const createGroup = (root, { name, ids }) => {
    const uuid = genUUID();
    internalGroups.set(uuid, Group(uuid, ids).edit({ name }));

    return internalGroups.get(uuid);
};

export const editGroup = (root, { uuid, ...props }) => internalGroups.set(uuid, internalGroups.get(uuid).edit(props));
export const removeGroup = (root, { uuid }) => {
    const group = internalGroups.get(uuid);

    group.delete();
    internalGroups.delete(uuid);

    return group;
};

export function fetchSpeaker(nameORuuid) {
    return discovery.getPlayerByUUID(nameORuuid)
        || discovery.getPlayer(nameORuuid)
        || (() => {
            throw new Error('Must either specify a UUID or name')
        })()
}
