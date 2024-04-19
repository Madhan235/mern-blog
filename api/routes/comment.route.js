import express from 'express';
import { createComment, deleteComment, editComment, getComment, getPostComment, likeComment } from '../controllers/comment.controllers.js';
import {verifyToken} from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken ,createComment);
router.get('/getpostcomments/:postId', getPostComment);
router.put('/likecomment/:commentId', verifyToken, likeComment);
router.put('/editcomment/:commentId', verifyToken, editComment);
router.delete('/deletecomment/:commentId', verifyToken, deleteComment);
router.get('/getcomments',verifyToken, getComment);



export default router;