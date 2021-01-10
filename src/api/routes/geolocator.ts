import { Router, Request, Response } from 'express';
import { GeolocationCrawler } from '../../crawlers/geolocator';

const route = Router();

export default (app: Router) => {
  app.use('/geolocator', route)

  route.get('/', (req: Request, res: Response) => {
    const crawler = new GeolocationCrawler('KFC WROCLAW NPARK MASLICE');
    const coords = crawler.get_coordinates();
    console.log("COORDS", coords);
    return res.json({ status: 'ok' }).status(200);
  })
};