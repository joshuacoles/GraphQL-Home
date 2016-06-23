import SonosDiscovery from 'sonos-discovery'
import _ from 'lodash'

const discovery = new SonosDiscovery({});

export const speaker = (root, { name, uuid }) => {
    if (name) return discovery.getPlayer(name);
    else if (uuid) return discovery.getPlayerByUUID(uuid);
    else throw new Error("Must either specify a UUID or name");
};

export const speakers = (root) => discovery.getZones()
                                           .map(x => discovery.getPlayerByUUID(x.uuid));

export function editSpeaker(root, props) {
    let player = speaker(root, props);

    if ('muted' in props) player.mute(props.muted);
    if ('volume' in props) player.setVolume(props.volume);
    if ('playing' in props && props.playing === true) player.coordinator.play();
    if ('playing' in props && props.playing === false) player.coordinator.pause();

    return speaker(root, props);
}
