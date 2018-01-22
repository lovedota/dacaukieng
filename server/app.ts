import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as appRoot from 'app-root-path';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as expressStaticGzip from 'express-static-gzip';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(favicon(path.join(appRoot.path, 'public', 'favicon.ico')));

if (process.env.NODE_ENV === 'dev') {
    app.use('/assets', express.static(path.join(appRoot.path, './public/assets')));
} else {
    app.use('/assets', expressStaticGzip(path.join(appRoot.path, './public/assets')));
}

app.get('*', (req: express.Request, res: express.Response, next) => {
    if (req.url.includes('api')) {
        return next();
    }

    res.sendFile(path.join(appRoot.path, 'public', 'index.html'));
});

export default app;
