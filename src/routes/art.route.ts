import { Router } from 'express';
import { create, getByCollection } from '../controllers/art.controller';

const router = Router();

router.post('/create', create);
router.get('/get/collection/:id', getByCollection);

export default router;
