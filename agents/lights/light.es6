import {
    GraphQLBoolean as Boolean,
    GraphQLString as String,
    GraphQLInt as Int,
} from 'graphql'

import { interfaceType, objectType, enumType, schemaFrom, listOf, notNull } from 'graphql-schema';
import { fullColourOf } from './service';

import { Colour, ColourMode } from "./colour";

export const Light = objectType('Light')
    .field('id', notNull(Int), 'The unique ID')
    .field('name', String, 'The human readable name')

    .field('state', notNull(Boolean), 'On/Off state', native => native.state.on)
    .field('brightness', notNull(Int), 'Brightness as a percentage', native => Math.floor((native.state.bri / 255) * 100))

    .field('colour', notNull(Colour), 'Colour')
    .arg('mode', ColourMode, 'unknown', 'The colour mode to request')
    .resolve(fullColourOf)

    .end();

export default Light
