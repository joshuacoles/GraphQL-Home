import { Int, String, Boolean, objectType, notNull, listOf } from 'graphql-schema';

import Queue from './queue'

import { resolveQueue } from './service'

const Speaker = objectType("Speaker")
    .field('name', String)
    .field('muted', Boolean, native => native.state.mute)
    .field('playing', Boolean, native => native.playerState === 'PLAYING')
    .field('volume', Int, native => {
        // console.log(JSON.stringify(native))
        return native.state.volume
    })
    .field('queue', Queue, resolveQueue)
    .end();

export default Speaker
