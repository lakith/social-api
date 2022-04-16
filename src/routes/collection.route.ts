import { Router } from 'express';
import { createCollection } from '../controllers/collection.controller';

const router = Router();

router.post('/create', createCollection);

export default router;
