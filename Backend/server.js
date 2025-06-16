import express from 'express';
import cors from 'cors';
import { getPostsController, createPostController, updatePostLikesController, deletePostController } from './controllers/posts.controller.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// --- RUTAS ---
app.get('/posts', getPostsController);
app.post('/posts', createPostController);

// --- NUEVA RUTA PUT (para likes) ---
// Nota: El frontend llama a /posts/like/:id, por eso la ruta es asi.
app.put('/posts/like/:id', updatePostLikesController);

// --- NUEVA RUTA DELETE ---
app.delete('/posts/:id', deletePostController);


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor "Like Me" escuchando en http://localhost:${PORT}`);
});