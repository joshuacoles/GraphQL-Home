import {
    GraphQLBoolean as Boolean,
    GraphQLString as String,
    GraphQLInt as Int,
} from 'graphql'

import { interfaceType, objectType, enumType, schemaFrom, listOf, notNull } from 'graphql-schema';
import Light from './light';

const GroupType = enumType('GroupType')
    .value('LIGHT_GROUP', 'LightGroup')
    .value('ROOM', 'Room')
    .end();

const Group = objectType('Group')
    .field('id', notNull(Int), 'The unique ID')
    .field('name', notNull(String), 'The human readable name')
    .field('type', notNull(GroupType), 'The type of the group')
    .field('lights', notNull(listOf(Light)), 'The lights in this group')
        .resolve(native => 1)
    .end();

export default Group
