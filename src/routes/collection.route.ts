import { Router } from 'express';
import { createCollection, getAll, getByUser, remove } from '../controllers/collection.controller';
import passport from 'passport'

const router = Router();

router.post('/create', passport.authenticate("jwt", { session: false }), createCollection);
router.get('/get', passport.authenticate("jwt", { session: false }), getAll);
router.get('/get/:id', passport.authenticate("jwt", { session: false }),  getByUser);
router.delete('/delete/:id', passport.authenticate("jwt", { session: false }),  remove);

export default router;
