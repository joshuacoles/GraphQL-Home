import {HueApi} from 'node-hue-api'
import {ip, username} from './hue.json'
import Remapper from '../../random/objectMapper'
import _ from 'lodash'

const api = new HueApi(ip, username);
const colourRemapper = new Remapper()
    .remove('id')
    .remove('name')
    .rename('brightness')
    .rename('state', 'on')
    .complex(({colour, ...rest}) => {
        if (_.isArray(colour) && colour.length === 2) {
            return {xy: colour, ...rest}
        } else if (_.isNumber(colour)) {
            return {ct: colour, ...rest}
        }
    });

export const fetchLight = (_, {id}) => api.lightStatus(id);
export const fetchGroup = (_, {id}) => api.group(id);

export function editLight(_, {id, ...props}) {
    return api.setLightState(id, colourRemapper.map(props))
        .then(() => {
            if (props.name) {
                return api.setLightName(id, props.name)
            }
        })
        .then(() => api.group(id));
}

export function editLightsInGroup(_, {groupId, ...props}) {
    return api.setLightState(groupId, colourRemapper.map(props))
        .then(() => api.group(id));

}

export function createGroup(_, {name, lights}) {
    return api.createGroup(name, lights);
}

export function editGroup(_, {id, name, lights}) {
    return api.updateGroup(id, name, lights)
        .then(() => api.group(id));
}

export function deleteGroup(_, {id}) {
    return fetchGroup(_, {id})
        .done(_ => api.deleteGroup(id));
}

export function addLights(_, {id, lights}) {
    api.group(id)
        .then(({currLights}) => api.updateGroup(id, _.uniq(currLights, lights)))
        .then(() => api.group(id));
}

export function removeLights(_, {id, lights}) {
    api.group(id)
        .then(({currLights}) => api.updateGroup(id, _.difference(currLights, lights)))
        .then(() => api.group(id));
}

const colourConverters = {
    ct: {
        unknown: v => v,
        ct: ct => ct,
        xy: ct => xy
    },
    xy: {
        unknown: v => v,
        xy: xy => xy,
        ct: xy => ct
    },
    unknown: {
        unknown: v => v,
        xy: v => v,
        ct: v => v
    }
};

export function fullColourOf(native, {mode}) {
    let nativeMode = native.colormode;
    let nativeValue = native.status[native.colormode];

    return {
        mode,
        value: colourConverters[nativeMode][mode](nativeValue),

        nativeMode,
        nativeValue
    }
}
