require('babel-polyfill')

require('babel-register')({
    presets: ['es2015', 'stage-0']
});
require('./server.es6');
