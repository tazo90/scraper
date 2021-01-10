import { Router } from 'express';

import geolocation from './routes/geolocation';

export default () => {
  const app = Router();
  geolocation(app);

  return app;
}