import 'babel-register'

import express from 'express'
import fs from 'fs'

const Router = express.Router;
const app = express();
require('express-ws')(app);

function prepRouter(schema) {
    let router = Router();

    router.get('/', (res, req, next) => res.send("hey"));

    router.ws('/', (ws, req) => {
        ws.on('message', message => {
            //fixme message
        })
    })
}

fs.readdirSync('agents')
    .map(file => [file.split('.')[0], require(`./agents/${file}`)])
    .map(([id, schema]) => [id, prepRouter(schema)])
    .forEach(([id, router]) => app.use(`/${id}`, router));

app.listen(80);
