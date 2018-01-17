import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as appRoot from 'app-root-path';
import * as path from 'path';
import * as favicon from 'serve-favicon';

const app = express();

app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(favicon(path.join(appRoot.path, 'public', 'favicon.ico')));

 // application -------------------------------------------------------------
app.get('/*', (req: express.Request, res: express.Response, next) => {
    if (req.url.includes('api')) {
        return next();
    }

    res.sendFile(path.resolve(appRoot.path, './index.html'));
});

export default app;
