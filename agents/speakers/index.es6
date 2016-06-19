import{ Float, Boolean, Int, String, objectType, schemaFrom, listOf, notNull } from 'graphql-schema';
import Speaker from './speaker';
import * as service from './service';

// /@formatter:off
const query = objectType("SpeakerQuery")
    .field('speakers', listOf(Speaker), service.speakers)

    .field('speaker', Speaker)
        .arg('name', String)
        .arg('uuid', String)
        .resolve(service.speaker)
    
    .end();

const mutation = objectType("SpeakerMutation")
    .field('editSpeaker', Speaker)
        .arg('name', String)
        .arg('uuid', String)
        
        .arg('playing', Boolean)
        .arg('muted', Boolean)
        .arg('volume', Int)
        
        .resolve(service.editSpeaker)
    .end();
// /@formatter:on

export default schemaFrom(query, mutation)
