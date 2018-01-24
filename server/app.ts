import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as appRoot from 'app-root-path';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as expressStaticGzip from 'express-static-gzip';
import * as minifyHTML from 'express-minify-html';

const app = express();
const ASSETS_PATH = path.join(appRoot.path, './public/assets');

app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(favicon(path.join(appRoot.path, 'public', 'favicon.ico')));
app.set('views', path.join(appRoot.path, './server/views'));
app.set('view engine', 'vash');

if (process.env.NODE_ENV === 'dev') {
    app.use('/assets', express.static(ASSETS_PATH));
} else {
    app.use('/assets', expressStaticGzip(ASSETS_PATH));
}

app.get('*', (req: express.Request, res: express.Response, next) => {
    if (req.url.includes('api')) {
        return next();
    }

    const assetsUrl = app.locals.assetUrls;

    res.render('index', assetsUrl);
});

export default app;
