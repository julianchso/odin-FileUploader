import { Router } from 'express';

const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
  res.json({ status: 200, statusText: 'OK', message: 'API is working' });
});

export default apiRouter;
