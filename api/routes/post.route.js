import express from 'express';
import {verifyToken} from '../utils/verifyUser.js'
import { createPost, deletepost, getposts, updatepost } from '../controllers/post.controllers.js';

const router = express.Router();

router.post('/create', verifyToken, createPost );

router.get('/getposts', getposts);
router.delete('/delete/:postId/:userId', verifyToken,deletepost);
router.put('/update/:postId/:userId', verifyToken, updatepost)

export default router