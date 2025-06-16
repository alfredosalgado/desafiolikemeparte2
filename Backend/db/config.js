import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
    allowExitOnIdle: true,
});

try {
    await pool.query('SELECT NOW()');
    console.log('🎉 Base de Datos Conectada');
} catch (error) {
    console.error('🔴 Error al conectar con la Base de Datos:', error);
}

export default pool;