import { Router } from 'express';

import { createPost, deletePost, getPost, updatePost} from '../controllers/post.controller';

const router = Router();

router.post('/', createPost);

router.get('/', getPost);

router.delete('/:id', deletePost);

router.put('/:id', updatePost)

export default router;
