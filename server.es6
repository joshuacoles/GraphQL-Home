import fs from 'fs'
import R from 'ramda'

let requireFile = R.curry(R.pipe(
    (path, file) => `./${path}/${file}`,
    require,
    R.prop('default')
));

let agents = fs.readdirSync('agents')
               .map(file => [file.split('.')[0], requireFile('agents', file)]);

fs.readdirSync('frontends')
  .map(requireFile('frontends'))
  .map(f => f(agents));
