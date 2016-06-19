import SonosDiscovery from 'sonos-discovery'
import _ from 'lodash'

const discovery = new SonosDiscovery({});

export const speaker = (root, { name }) => _.extend({}, discovery.getPlayer(name), { name });
// export const resolveQueue = native => {
//     native.coordinator.getQueue(0, 500, function (err, data) {})
// };

export function editSpeaker(root, props) {
    console.log(props)
    let player = speaker(root, props);

    if ('muted' in props) player.mute(props.muted);
    if ('volume' in props) player.setVolume(props.volume);
    if ('playing' in props && props.playing === true) player.coordinator.play();
    if ('playing' in props && props.playing === false) player.coordinator.pause();
    
    return speaker(root, props);
}
