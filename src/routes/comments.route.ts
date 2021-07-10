import { Router } from 'express';

import { createComment, deleteComments, getCommentsByPost, updateComment} from '../controllers/comments.controller';

const router = Router();

router.post('/', createComment);

router.get('/:postId', getCommentsByPost);

router.delete('/:id', deleteComments);

router.put('/:id', updateComment)

export default router;
