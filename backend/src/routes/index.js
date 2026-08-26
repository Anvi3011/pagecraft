import { Router } from 'express';
import healthRouter from './health.routes.js';

const apiRouter = Router();

// Mount individual domain routes
apiRouter.use('/health', healthRouter);

export default apiRouter;
