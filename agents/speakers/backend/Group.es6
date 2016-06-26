import { fetchSpeaker } from './index'
import hash from 'object-hash'
import R from 'ramda'
import { prop } from '../../../lib/util'

const internal = Symbol();

export default (uuid, speakerIds) => ({
    uuid, name: undefined,

    [internal]: { speakerIds, tempSpeakers: undefined, speakersHash: undefined, queue: undefined },

    get speakers() {
        if (!hash(this[internal].speakerIds) == this[internal].speakersHash) {
            this[internal].speakersHash = hash(this[internal].speakerIds);
            this[internal].tempSpeakers = this[internal].speakerIds
                                                        .map(fetchSpeaker);
        }

        return this[internal].tempSpeakers;
    },

    set speakers(newSpeakers) {
        this[internal].speakerIds(newSpeakers.map(speaker => typeof speaker === 'string' ? speaker : speaker.uuid))
    },

    get muted() {
        return this.speakers.every(prop('muted'));
    },

    get playing() {
        return this.speakers.any(prop('playing'));
    },

    get volume() {
        const volume = R.mean(this.speaker.map(prop('volume')));
        if (!R.all(speaker => 'volumeAdjustment' in speaker[internal], this.speakers)) {
            this.speakers.map(speaker => speaker[internal].volumeAdjustment = speaker.volume - volume)
        }

        return volume;
    },

    set volume(newVolume) {
        if (newVolume == 0) this.speakers.forEach(speaker => speaker.volume = 0);
        if (newVolume == 100) this.speakers.forEach(speaker => speaker.volume = 100);

        this.speakers.map(speaker => speaker.volume = newVolume + speaker[internal].volumeAdjustment)
    },

    set queue(newQueue) {
        this.speaker.forEach(speaker => {
            speaker[internal].ownQueue = speaker.queue;
            speaker.queue = newQueue
        });

        this[internal].queue = newQueue;
    },

    get queue() {
        return this[internal].queue;
    },

    edit({ name = this.name, speakers = this.speakers, queue = this.queue }) {
        this.name = name;
        this.speakers = speakers;
        this.queue = queue;

        return this;
    },

    delete() {
        this.speakers.forEach(speaker => speaker.queue = speaker[internal].ownQueue)
    }
});
