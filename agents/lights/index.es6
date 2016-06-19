import { Float, Boolean, Int, String, objectType, schemaFrom, listOf, notNull } from 'graphql-schema';

import { Light, AllLights } from './light';
import Group from './group';
import { ColourMode } from './colour.es6';
import * as service from "./service";

// /@formatter:off
const query = objectType('LightQuery')
    .field('light', Light)
        .arg('id', Int)
        .resolve(service.fetchLight)

    .field('group', Group)
        .arg('id', Int)
        .resolve(service.fetchGroup)

    .field('lights', listOf(Light))
        .resolve(service.fetchAllLights)

    .field('groups', listOf(Group))
        .resolve(service.fetchAllGroups)

    .end();

const mutation = objectType('LightMutation')
    .field('editLight', Light)
        .arg('id', notNull(Int))
        .arg('name', String)
        .arg('state', Boolean)
        .arg('brightness', Int)
        .arg('colour', listOf(Float))
        .arg('mode', ColourMode)
        .resolve(service.editLight)

    .field('editLightsInGroup', Light)
        .arg('groupId', notNull(Int))
        .arg('state', Boolean)
        .arg('brightness', Int)
        .arg('colour', listOf(Float))
        .arg('mode', ColourMode)
        .resolve(service.editLightsInGroup)

    .field('createGroup', Group)
        .arg('name', String)
        .arg('lights', notNull(listOf(Int)))
        .resolve(service.createGroup)

    .field('editGroup', Group)
        .arg('id', notNull(Int))
        .arg('name', Int)
        .arg('lights', listOf(Int))
        .resolve(service.editGroup)

    .field('deleteGroup', Group)
        .arg('id', notNull(Int))
        .resolve(service.deleteGroup)

    .field('addLights', Group)
        .arg('id', notNull(Int))
        .arg('lights', notNull(listOf(Int)))
        .resolve(service.addLights)

    .field('removeLights', Group)
        .arg('id', Int)
        .arg('lights', notNull(listOf(Int)))
        .resolve(service.removeLights)

    .end();
//@formatter:on

export default schemaFrom(query, mutation)

export function error(error) {
    if (error.message.match(/resource, \/lights\/([0-9]+), not available/)) {
        let id = error.message.match(/resource, \/lights\/([0-9]+), not available/)[1];

        return {
            error: 1,
            message: `Light: ${id} is currently unreachable`
        }
    }

    return {
        error: -1,
        message: ""
    }
}
