import R from 'ramda'

export const pipe = R.pipe;
export const prop = R.prop;
export const eq = R.equals;
export const has = R.has;

Array.prototype.any = function (f) {
    return this.map(f).indexOf(true) !== -1;
};

Object.prototype.tap = function (f) {
    f(this);
    return this;
};

export const extend = (...props) => Object.extend({}, ...props);
export const extendM = (...props) => Object.extend(...props);
