// backend/server.js

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import postsRouter from './routes/posts.routes.js'; // <-- Importé el router

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// --- RUTAS ---
// 2. Usamos el router como un middleware.
app.use('/', postsRouter); 

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor "Like Me" escuchando en http://localhost:${PORT}`);
});