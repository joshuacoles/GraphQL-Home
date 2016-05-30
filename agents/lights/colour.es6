import {
    GraphQLBoolean as Boolean,
    GraphQLString as String,
    GraphQLInt as Int,
} from 'graphql'

import { interfaceType, objectType, enumType, schemaFrom, listOf, notNull } from 'graphql-schema';

export const ColourMode = enumType('ColourMode', 'The different colour scopes that a light can have')
    .value('UNKNOWN', 'unknown', 'Unknown')
    .value('CT', 'ct', 'Colour Temperature')
    .value('XY', 'xy', 'XY position of CIE colour space')
    .end();

export const GenericColourValue = unionType('GenericColourValue', 'Can either represent an XY or CT colour value')
    .type(Int)
    .type(listOf(Int))
    .resolveType(value => {
        if (typeof value === 'number') return Int;
        else if (_.isArray(value)) return listOf(Int);
    }).end();

export const Colour = objectType('Colour', 'A colour in some scope')
    .field('mode', notNull(ColourMode), 'The reqested scope of this colour')
    .field('value', notNull(GenericColourValue), 'The value in the requested scope')
    
    .field('nativeMode', notNull(ColourMode), 'The native scope of this colour')
    .field('nativeValue', notNull(GenericColourValue), 'The colour value of this light in its native scope')
    
    .end();

export default Colour
