import express from 'express'

import { apolloServer } from 'apollo-server'

const Router = express.Router;

function prepRouter(schema) {
    let router = Router();

    router.use('/', apolloServer({
            schema: schema,
            graphiql: true,
            pretty: true,
            formatError: error => {
                console.error(error.stack);

                return ({
                    message: error.message,
                    locations: error.locations,
                    stack: error.stack
                })
            }
        })
    );
    
    router.ws('/', (ws, req) => {
        ws.on('message', message => {
            console.log(message)
        })
    });

    return router;
}

export default function (realms) {
    const app = express();
    require('express-ws')(app);

    realms.map(([id, schema]) => [id, prepRouter(schema)])
          .forEach(([id, router]) => app.use(`/${id}`, router));

    app.listen(3000)
}
