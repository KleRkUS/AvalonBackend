"use strict";

import express, { Express } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import * as http from 'http';
import config from 'config';

import {gameRouter} from "@routes";

const app: Express = express();
const port: number = config.get('application.port') ?? 8999;

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(gameRouter);

export const server: http.Server = http.createServer(app);

server.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

