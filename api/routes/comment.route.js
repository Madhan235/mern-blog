import express from 'express';
import { createComment, getPostComment } from '../controllers/comment.controllers.js';
import {verifyToken} from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken ,createComment);
router.get('/getpostcomments/:postId', getPostComment);

export default router;