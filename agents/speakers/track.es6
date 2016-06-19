import { Int, String, Boolean, objectType, notNull, listOf } from 'graphql-schema';

export const Track = objectType("Track")
    .field('id', Int)
    .field('title', String)
    .field('duration', Int, 'The duration of the track in seconds')

    .field('uri', String, 'The URI of the track')
    .field('artist', String, 'The name of the artist who wrote the track')
    .field('album', String, 'The album which contains this track')
    .end();

export const EnqueuedTrack = objectType('EnqueuedTrack')
    .field('id', Int)
    .field('title', String)
    .field('duration', Int, 'The duration of the track in seconds')

    .field('uri', String, 'The URI of the track')
    .field('artist', String, 'The name of the artist who wrote the track')
    .field('album', String, 'The album which contains this track')

    .field('position', Int)
    .end();
