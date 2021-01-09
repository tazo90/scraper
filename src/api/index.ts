import { Router } from 'express';

import geolocator from './routes/geolocator';

export default () => {
  const app = Router();
  geolocator(app);

  return app;
}