import { createServer } from 'http';
import app from './app';
import * as fs from 'fs';
import * as path from 'path';
import * as appRoot from 'app-root-path';
import '../server/controllers/home-controller';

const httpPort = process.env.PORT || 8080;

app.set('port', httpPort);

const httpServer = createServer(app);

// listen on provided ports
httpServer.listen(httpPort);

// add error handler
httpServer.on('error', onError);

// start listening on port
httpServer.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
    throw error;
    }

    const bind = typeof httpPort === 'string'
    ? 'Pipe ' + httpPort
    : 'Port ' + httpPort;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

function onListening() {
    const addr = httpServer.address();
    const bind = typeof addr === 'string'
        ? 'http://www.dacaukieng.xyz'
        : `http://localhost:${addr.port}`;

    fs.readFile(path.join(appRoot.path, 'public', 'manifest.json'), 'utf8', (err, data) => {
        const json = JSON.parse(data);

        app.locals.assetUrls = {
            style: json['main.css'],
            main: json['main.js'],
            vendor: json['vendor.js']
        };
    });

    // tslint:disable-next-line:no-console
    console.log(`Running in ${bind}`);
}
