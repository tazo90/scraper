import { Router, Request, Response } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/geolocator', route)

  route.get('/', (req: Request, res: Response) => {
    return res.json({ status: 'ok' }).status(200);
  })
};