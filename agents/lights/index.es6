import {
    GraphQLBoolean as Boolean,
    GraphQLString as String,
    GraphQLInt as Int,
} from 'graphql'

import { interfaceType, objectType, enumType, schemaFrom, listOf, notNull } from 'graphql-schema';

import Light from './light';
import Group from './group';
import { GenericColourValue } from "./colour";
import * as service from "./service";

// /@formatter:off
const query = objectType('LightQuery')
    .field('light', Light)
        .arg('id', Int)
        .resolve(service.fetchLight)

    .field('group', Group)
        .arg('id', Int)
        .resolve(service.fetchGroup)

    .end();

const mutation = objectType('LightMutation')
    .field('editLight', Light)
        .arg('id', notNull(Int))
        .arg('name', String)
        .arg('state', Boolean)
        .arg('brightness', Int)
        .arg('colour', GenericColourValue)
        .resolve(service.editLight)

    .field('editLightsInGroup', Light)
        .arg('groupId', notNull(Int))
        .arg('state', Boolean)
        .arg('brightness', Int)
        .arg('colour', GenericColourValue)
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
