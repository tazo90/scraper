import { Router, Request, Response } from 'express';

import GeoLocationPositionScraper from '../../scrapers/geolocation';

const route = Router();

export default (app: Router) => {
  app.use('/geolocation', route)

  route.get('/', async (req: Request, res: Response) => {
    const scraper = new GeoLocationPositionScraper('KFC WROCLAW NPARK MASLICE');
    const position = await scraper.getPosition();

    console.log("POSITION", position);

    return res.json({ status: 'ok' }).status(200);
  })
};