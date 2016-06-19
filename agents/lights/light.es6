import { Int, String, Boolean, objectType, notNull, listOf } from 'graphql-schema';
import { fullColourOf } from './colourManager';

import { Colour, ColourMode } from "./colour";

export const Light = objectType('Light')
    .field('id', notNull(Int), 'The unique ID')
    .field('name', String, 'The human readable name')

    .field('state', notNull(Boolean), 'On/Off state', native => native.state.on)
    .field('brightness', notNull(Int), 'Brightness as a percentage', native => Math.round((native.state.bri / 255) * 100))

    .field('reachable', notNull(Boolean), 'If the light is reachable', native => native.state.reachable)

    .field('colour', Colour, 'Colour')
        .arg('mode', ColourMode, 'native', 'The colour mode to request')
        .resolve(fullColourOf)

    .end();

export default Light
