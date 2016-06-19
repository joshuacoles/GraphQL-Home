import { Float, objectType, enumType, listOf, notNull, inputType, String } from 'graphql-schema';


export const ColourMode = enumType('ColourMode', 'The different colour scopes that a light can have')
    .value('native', 'native', 'The native colour mode for this light')
    // .value('dimmable', 'dimmable', 'The colour mode used for if this light is only dimmable.')

    .value('ct', 'ct', 'Colour Temperature')
    .value('xy', 'xy', 'XY position of CIE colour space')

    .value('rgb', 'rgb', 'Standard RGB')
    .value('hsl', 'hsl', 'Hue Saturation and Lightness')
    .value('hsv', 'hsv', 'Hue Saturation and Value')
    .value('hwb', 'hwb')
    .value('cmyk', 'cmyk')
    .value('xyz', 'xyz', 'XYZ positions in the CIE colour space')
    .value('lab', 'lab')
    .value('lch', 'lch')
    .value('hcg', 'hcg')
    .value('apple', 'apple', 'Apple Specific RGB values')
    
    .end();

export const Colour = objectType('Colour', 'A colour in some scope')
    .field('mode', String, 'The requested scope of this colour')
    .field('value', notNull(listOf(Float)), 'The value in the requested scope')

    .field('nativeMode', String, 'The native scope of this colour')
    .field('nativeValue', notNull(listOf(Float)), 'The colour value of this light in its native scope')

    .end();

// export const ColourInput = inputType("Name")
//     .arg(mode, ColourMode, (_, {}))

export default Colour
