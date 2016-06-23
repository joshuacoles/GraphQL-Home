import * as fs from 'fs'
import * as path from 'path'

import R from 'ramda'

import { makeExecutableSchema } from 'graphql-tools'

let requireFile = R.curry(R.pipe(
    (path, file) => `./${path}/${file}`,
    require,
    R.prop('default')
));

const readResolvers = dir => fs.readdirSync(dir)
                               .map(file => [file.split('.')[0], path.join(dir, file)])
                               .map(([id, path]) => [id, require(`./${path}`)])
                               .map(([id, req]) => ({ [id]: req }))
                               .reduce(R.merge);

function requireAgent(agent) {
    const typeDefinition = fs.readdirSync(path.join('agents', agent, 'schemas')).map(file => fs.readFileSync(path.join('agents', agent, 'schemas', file)).toString());
    console.log(typeDefinition)
    const resolvers = readResolvers(path.join('agents', agent, 'resolvers'));

    return [agent, makeExecutableSchema({
        typeDefs: typeDefinition,
        resolvers
    })]
}

let agents = fs.readdirSync('agents')
               .map(requireAgent);

fs.readdirSync('frontends')
  .map(requireFile('frontends'))
  .map(f => f(agents));
