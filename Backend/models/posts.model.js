import pool from '../db/config.js';


export const getPostsModel = async () => {
    try {
        const sqlQuery = 'SELECT * FROM posts ORDER BY id DESC;';
        const { rows } = await pool.query(sqlQuery);
        return rows;
    } catch (error) {
        console.error("Error en modelo al obtener posts:", error);
        throw error;
    }
};


export const createPostModel = async ({ titulo, url, descripcion }) => {
    try {
        const likes = 0;
        const values = [titulo, url, descripcion, likes];
        const sqlQuery = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *;';
        const { rows } = await pool.query(sqlQuery, values);
        return rows[0];
    } catch (error) {
        console.error("Error en modelo al crear post:", error);
        throw error;
    }
};

// --- NUEVA FUNCIÓN PUT (para likes) ---
export const updatePostLikesModel = async (id) => {
    try {
        // Incrementa el campo likes en 1 donde el id coincida
        const sqlQuery = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *;';
        const values = [id];
        const { rows, rowCount } = await pool.query(sqlQuery, values);

        // Si rowCount es 0, el post no fue encontrado
        if (rowCount === 0) {
            throw { code: 404, message: `No se encontró ningún post con el ID ${id}` };
        }
        return rows[0];
    } catch (error) {
        console.error("Error en modelo al actualizar likes:", error);
        // Si el error ya tiene un código (como el 404 que lanzamos), lo pasamos. Si no, es un error generico.
        throw error;
    }
};

// --- NUEVA FUNCIÓN DELETE ---
export const deletePostModel = async (id) => {
    try {
        const sqlQuery = 'DELETE FROM posts WHERE id = $1;';
        const values = [id];
        const { rowCount } = await pool.query(sqlQuery, values);

        // Si rowCount es 0, el post no fue encontrado 
        if (rowCount === 0) {
            throw { code: 404, message: `No se encontró ningún post con el ID ${id}` };
        }
        // DELETE no devuelve la fila, así que solo confirmamos con rowCount
        return rowCount;
    } catch (error) {
        console.error("Error en modelo al eliminar post:", error);
        throw error;
    }
};