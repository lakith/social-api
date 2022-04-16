import { Router } from 'express';
import { createCollection, getAll, getByUser } from '../controllers/collection.controller';

const router = Router();

router.post('/create', createCollection);
router.get('/get', getAll);
router.get('/get/:id', getByUser);

export default router;
