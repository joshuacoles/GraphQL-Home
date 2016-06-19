import { Int, String, Boolean, objectType, notNull, listOf } from 'graphql-schema';

// import Queue from './queue'
//
// import { resolveQueue } from './service'

const Speaker = objectType("Speaker")
    .field('uuid', String)
    .field('name', String, native => native.roomName)
    .field('muted', Boolean, native => native.state.mute)
    .field('playing', Boolean, native => native.playerState === 'PLAYING')
    .field('volume', Int, native => native.state.volume)
    // .field('queue', Queue, resolveQueue)
    .end();

export default Speaker
