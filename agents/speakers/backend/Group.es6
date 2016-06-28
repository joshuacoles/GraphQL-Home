import { fetchSpeaker } from './index'
import hash from 'object-hash'
import R from 'ramda'
import { prop, has, pipe } from '../../../lib/util'

const internal = Symbol();

export default (uuid, speakerIds) => ({
    uuid, name: undefined,

    [internal]: { speakerIds, tempSpeakers: undefined, speakersHash: undefined, queue: undefined },

    get speakers() {
        if (hash(this[internal].speakerIds) !== this[internal].speakersHash) {
            this[internal].speakersHash = hash(this[internal].speakerIds);
            this[internal].tempSpeakers = this[internal].speakerIds
                                                        .map(fetchSpeaker)
                                                        .map(o => o[internal] = { own: {} });
        }

        return this[internal].tempSpeakers;
    },

    set speakers(newSpeakers) {
        this[internal].speakerIds = (newSpeakers || []).map(speaker => typeof speaker === 'string' ? speaker : speaker.uuid)
    },

    get muted() {
        return this.speakers.every(prop('muted'));
    },

    set muted(muted) {
        this.speakers.forEach(speaker => {
            speaker[internal].own.muted = speaker.muted;
            speaker.muted = muted;
        });
    },

    get playing() {
        return this.speakers.any(prop('playing'));
    },

    set playing(playing) {
        this.speakers.forEach(speaker => {
            speaker[internal].own.playing = speaker.playing;
            speaker.playing = playing;
        });
    },

    get volume() {
        const volume = R.mean(this.speakers.map(prop('volume'))) || 50;
        if (this.speakers.every(speaker => has(speaker[internal], 'volumeAdjustment'))) {
            this.speakers.map(speaker => speaker[internal].volumeAdjustment = speaker.volume - volume)
        }

        return volume;
    },

    set volume(newVolume) {
        this.speakers.forEach(speaker => speaker[internal].own.volume = speaker.volume);

        if (newVolume == 0) this.speakers.forEach(speaker => speaker.volume = 0);
        if (newVolume == 100) this.speakers.forEach(speaker => speaker.volume = 100);

        this.speakers.map(speaker => speaker.volume = newVolume + speaker[internal].volumeAdjustment)
    },

    set queue(newQueue) {
        this.speakers.forEach(speaker => {
            speaker[internal].own.queue = speaker.queue;
            speaker.queue = newQueue
        });

        this[internal].queue = newQueue;
    },

    get queue() {
        return this[internal].queue;
    },

    edit({ name, speakers, queue }) {
        if (name) this.name = name;
        if (speakers) this.speakers = speakers;
        if (queue) this.queue = queue;

        return this;
    },

    delete() {
        this.speakers.forEach(speaker => Object.extend(speaker, speaker['internal'].own))
    }
});
