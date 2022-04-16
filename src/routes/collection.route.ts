import { Router } from 'express';
import { createCollection, getAll, getByUser, remove } from '../controllers/collection.controller';

const router = Router();

router.post('/create', createCollection);
router.get('/get', getAll);
router.get('/get/:id', getByUser);
router.delete('/delete/:id', remove);

export default router;
