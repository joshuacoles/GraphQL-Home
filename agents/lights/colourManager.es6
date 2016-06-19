import Remapper from '../../random/objectMapper'
import converter from 'color-convert'

const toLightStateRemapper = new Remapper()
    .remove('id')
    .remove('name')
    .remove('mode')
    .remove('colour')
    .rename('state', 'on');

function toNative(native, mode, value) {
    let nativeMode = native.state.colormode;
    let nativeValue;

    if (mode === 'native' || nativeMode === mode) nativeValue = value;
    else return nativeValue = converter[mode][nativeMode](value);

    return { [nativeMode]: nativeValue }
}

function getNative(native) {
    console.log(`Computing native for ${native.id} (${native.state.reachable})`);
    let nativeMode = native.state.colormode;

    if (nativeMode === 'ct') return [nativeMode, [native.state.ct]];
    else if (nativeMode === 'xy') return [nativeMode, native.state.xy];
    else {
        console.error(`An invalid native mode (${nativeMode}) has been detected for light ${native.id}`);
        console.error(JSON.stringify(native))
    }
}

function toRequested([nativeMode, nativeValue], requestedMode) {
    console.log(`${nativeMode} => ${requestedMode} ? ${typeof converter[nativeMode][requestedMode]}`);

    if (requestedMode === 'native' || requestedMode === nativeMode) return [nativeMode, nativeValue];
    else return [requestedMode, converter[nativeMode][requestedMode](nativeValue)]
}

export function fullColourOf(native, { mode: requestedMode }) {
    if (!native.state.reachable) return null;
    else if (native.state.colormode) {
        let [nativeMode, nativeValue] = getNative(native);
        let [mode, value] = toRequested([nativeMode, nativeValue], requestedMode);

        return {
            mode,
            value,
            nativeMode,
            nativeValue
        }
    } else {
        if (requestedMode === 'native') {
            return {
                mode: requestedMode,
                value: [1],
                nativeMode: 'dimmable',
                nativeValue: [1]
            }
        } else {
            return {
                mode: requestedMode,
                value: converter.keyword[requestedMode]('white'),
                nativeMode: 'dimmable',
                nativeValue: [1]
            }   
        }
    }

    // console.log(`Requested mode = ${requestedMode}`);
    // let x = getNative(native);
    // console.log(`Native info = ${x}`);
    //
    //
    // console.log();
    // return {
    //     mode: "x", value: [1], nativeMode: "x", nativeValue: [1]
    // };
    // let requestedMode = args.mode;
    //
    // if (!native.state.reachable) {
    //     console.log("HE")
    //     return null;
    // }
    //
    // let [nativeMode, nativeValue] = getNative(native);
    // let [mode, value] = toRequested([nativeMode, nativeValue], requestedMode);
    //
    // return {
    //     mode,
    //     value,
    //     nativeMode,
    //     nativeValue
    // }
}

function toLightState(native, props = {}) {
    let colourComponent =
        (props.mode && props.colour) ? toNative(native, props.mode, props.colour) : {};

    return {
        ...(toLightStateRemapper.map(props)),
        ...(colourComponent)
    };
}
