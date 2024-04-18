import express from 'express';
import { createComment, getPostComment, likeComment } from '../controllers/comment.controllers.js';
import {verifyToken} from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken ,createComment);
router.get('/getpostcomments/:postId', getPostComment);
router.put('/likecomment/:commentId', verifyToken, likeComment);

export default router;