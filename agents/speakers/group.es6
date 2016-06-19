import { Int, String, Boolean, objectType, notNull, listOf } from 'graphql-schema';

import Speaker from './speaker'
import Queue from './queue'

const Group = objectType("Group")
    .field('id', Int)
    .field('name', String)
    .field('muted', Boolean)
    .field('playing', Boolean)
    .field('volume', Int)
    .field('queue', Queue)

    .field('speakers', listOf(Speaker))
    .end();
