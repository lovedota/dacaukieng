import * as fs from 'fs';
import * as path from 'path';
import * as appRoot from 'app-root-path';
import * as web from 'express-decorators';
import app from '../app';

const ITEMS_PER_PAGE = 10;

@web.basePath('/api/home')
class HomeController {
    @web.get('/video')
    async getVideo(req: any, res: any) {
        const { page } = req.query;

        fs.readFile(path.resolve(appRoot.path, './server/fixtures/video.json'), 'utf8', (err, data) => {
            if (err) {
                res.json(err).status(500);
            }

            const jsonObjects = JSON.parse(data);
            const basePage = page * ITEMS_PER_PAGE;

            res.json({
                items: jsonObjects.data.slice(basePage,  basePage + ITEMS_PER_PAGE),
                total: jsonObjects.data.length
            });
        });
    }

    @web.get('/places')
    async getPlaces(req: any, res: any) {
        const locations = [
            {
                label: `Công Viên Văn Lang`,
                position: {lat: 10.7566155, lng: 106.6657839},
                color: '#FFA500'
            },
            {
                label: `Nhà văn hóa quận 5`,
                position: {lat: 10.7528463, lng: 106.66828},
                color: '#568EFC'
            },
            {
                label: `Công Viên Gia Định`,
                position: {lat: 10.810617868398955, lng: 106.6733213121338},
                color: '#F07561'
            }
        ];

        res.json({
            locations
        });
    }
}

web.register(app, new HomeController());
