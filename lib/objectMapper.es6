import _ from 'lodash'
import R from 'ramda'

export default class Remapper {
    constructor() {
        this.mappings = [];
    }

    rename(from, to) {
        this.mappings.push(({ [from]: v, ...rest }) => typeof v !== 'undefined' ? ({ [to]: v, ...rest }) : rest );
        return this;
    }

    complex(f) {
        this.mappings.push(f);
        return this;
    }

    transform(keys, f) {
        this.mappings.push(obj => {
            let pairs = _.toPairs(obj);
            
            let chosen = pairs.filter(([k ,v]) => _.includes(keys, k));
            let rest = pairs.filter(([k ,v]) => !_.includes(keys, k));

            return { ...f(chosen), ...rest }
        });

        return this;
    }

    remove(key) {
        this.mappings.push(({ [key]: _, ...rest }) => rest);
        return this;
    }

    add(key, value) {
        this.mappings.push(o => ({ [key]: value, ...o } ));
        return this;
    }

    addBy(key, f) {
        this.mappings.push(o => ({ [key]: f(o), ...o } ));
        return this;
    }

    map(obj) {
        return this.mappings.reduce((result, next) => next(result), obj)
    }
}
