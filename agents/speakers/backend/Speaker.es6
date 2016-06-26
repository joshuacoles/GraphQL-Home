import { extend } from '../../../lib/util'

const internal = Symbol();

export default (uuid, discovery) => ({
    uuid, queue: undefined,

    [internal]: extend(discovery.getPlayerByUUID(uuid), {
        get state() {
            return this.getState();
        }
    }),

    get name() {
        return this[internal].roomName;
    },

    set name(newName) {
        throw new Error("Cannot set name!!")
    },

    get muted() {
        return this[internal].state.mute;
    },

    set muted(muted) {
        this[internal].mute(muted);
    },

    get playing() {
        return this[internal].state.currentState === 'PLAYING';
    },

    set playing(newPlaying) {
        (newPlaying ? this[internal].play : this[internal].pause)();
    },

    get volume() {
        this[internal].state.volume;
    },

    set volume(newVolume) {
        this[internal].setVolume(newVolume)
    },

    edit({ muted = this.muted, volume = this.volume, playing = this.playing, queue = this.queue }) {
        this.muted = muted;
        this.volume = volume;
        this.playing = playing;
        this.queue = queue;
    }
});