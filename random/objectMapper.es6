export default class Remapper {
    constructor() {
        this.mappings = [];
    }

    rename(from, to) {
        this.mappings.push(({[from]: v, ...rest}) => ({[to]: v, ...rest} ));
        return this;
    }

    complex(f) {
        this.mappings.push(f);
        return this;
    }

    remove(key) {
        this.mappings.push(({[key]: _, ...rest}) => ({...rest} ));
        return this;
    }

    add(key, value) {
        this.mappings.push(o => ({[key]: value, ...o} ));
        return this;
    }

    addBy(key, f) {
        this.mappings.push(o => ({[key]: f(o), ...o} ));
        return this;
    }

    map(obj) {
        return this.mappings.reduce((result, next) => next(result), obj)
    }
}
