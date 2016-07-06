import R from 'ramda'

export const pipe = R.pipe;
export const prop = R.prop;
export const eq = R.equals;
export const has = (obj, key) => typeof obj === 'undefined' ? false : obj.hasOwnProperty(key);

Array.prototype.any = function (f) {
    return this.map(f).indexOf(true) !== -1;
};

export const extend = (...props) => Object.extend({}, ...props);
export const extendM = (...props) => Object.extend(...props);
