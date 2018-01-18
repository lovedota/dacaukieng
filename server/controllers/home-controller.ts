import * as fs from 'fs';
import * as path from 'path';
import * as appRoot from 'app-root-path';
import * as web from 'express-decorators';
import app from '../app';

@web.basePath('/api/home')
class HomeController {
    @web.get('/video')
    async getVideo(req: any, res: any) {
        // tslint:disable-next-line:no-console
        console.log(req.params);

        fs.readFile(path.resolve(appRoot.path, './server/fixtures/video.json'), 'utf8', (err, data) => {
            if (err) {
                res.json(err).status(500);
            }

            const jsonObjects = JSON.parse(data);

            res.json({
                items: jsonObjects.data,
                total: jsonObjects.data.length
            });
        });
    }
}

web.register(app, new HomeController());
