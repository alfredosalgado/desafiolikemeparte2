// backend/routes/posts.routes.js

import { Router } from 'express';
import { 
    getPostsController, 
    createPostController, 
    updatePostLikesController, 
    deletePostController 
} from '../controllers/posts.controller.js';

const router = Router();

// Definimos las rutas usando el objeto 'router'
router.get('/posts', getPostsController);
router.post('/posts', createPostController);
router.put('/posts/like/:id', updatePostLikesController);
router.delete('/posts/:id', deletePostController);

export default router;