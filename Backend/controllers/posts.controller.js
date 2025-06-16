import { getPostsModel, createPostModel, updatePostLikesModel, deletePostModel } from '../models/posts.model.js';


export const getPostsController = async (req, res) => {
    try {
        const posts = await getPostsModel();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createPostController = async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body;
        if (!titulo || !url || !descripcion) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }
        const newPost = await createPostModel({ titulo, url, descripcion });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// --- NUEVO CONTROLLER PUT (para likes) ---
export const updatePostLikesController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = await updatePostLikesModel(id);
        res.status(200).json(updatedPost);
    } catch (error) {
        // Manejo de errores personalizado 
        const statusCode = error.code === 404 ? 404 : 500;
        res.status(statusCode).json({ error: error.message });
    }
};

// --- NUEVO CONTROLLER DELETE ---
export const deletePostController = async (req, res) => {
    try {
        const { id } = req.params;
        await deletePostModel(id);
        res.status(200).send('Post eliminado con éxito');
    } catch (error) {
        const statusCode = error.code === 404 ? 404 : 500;
        res.status(statusCode).json({ error: error.message });
    }
};