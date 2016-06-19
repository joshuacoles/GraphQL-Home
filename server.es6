import fs from 'fs'
import R from 'ramda'

let requireFile = R.curry(
    R.compose(
        R.prop('default'),
        require,
        (path, file) => `./${path}/${file}`
    )
);

let agents = fs.readdirSync('agents')
    .map(file => [file.split('.')[0], requireFile('agents', file)]);

fs.readdirSync('frontends')
    .map(requireFile('frontends'))
    .map(f => f(agents));
