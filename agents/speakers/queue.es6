import { Int, String, Boolean, objectType, notNull, listOf, enumType } from 'graphql-schema';

import { EnqueuedTrack } from "./track";

const QueueSetting = enumType('QueueSetting')
    .value('shuffle', 'shuffle')
    .value('loop', 'loop')
    .value('crossfade', 'crossfade')
    .value('repeat', 'repeat')
    .end();

const Queue = objectType("Queue")
    .field('length', Int)
    .field('duration', Int)
    .field('settings', listOf(QueueSetting))

    .field('tracks', listOf(EnqueuedTrack))

    .field('previous', EnqueuedTrack)
    .field('current', EnqueuedTrack)
    .field('next', EnqueuedTrack)

    .field('nth', EnqueuedTrack)
    .arg('id', Int)
    .end();


export default Queue;
