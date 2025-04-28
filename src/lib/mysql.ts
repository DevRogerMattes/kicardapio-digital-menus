
import mysql from 'mysql2/promise';

// Configuration for MySQL connection
interface DBConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
}

// Default configuration (these should be overridden with environment variables)
const DEFAULT_CONFIG: DBConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kicardapio',
  port: 3306
};

// Get actual configuration from environment variables or use defaults
const dbConfig: DBConfig = {
  host: import.meta.env.VITE_MYSQL_HOST || DEFAULT_CONFIG.host,
  user: import.meta.env.VITE_MYSQL_USER || DEFAULT_CONFIG.user,
  password: import.meta.env.VITE_MYSQL_PASSWORD || DEFAULT_CONFIG.password,
  database: import.meta.env.VITE_MYSQL_DATABASE || DEFAULT_CONFIG.database,
  port: parseInt(import.meta.env.VITE_MYSQL_PORT || DEFAULT_CONFIG.port.toString())
};

// Create a connection pool
const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test if MySQL is properly configured
export const isMySQLConfigured = async (): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    return true;
  } catch (error) {
    console.error("MySQL is not properly configured:", error);
    return false;
  }
};

// Execute a query with parameters
export const executeQuery = async <T>(
  query: string, 
  params: any[] = []
): Promise<T[]> => {
  try {
    const [rows] = await pool.execute(query, params);
    return rows as T[];
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

// Get a single row from a query
export const querySingle = async <T>(
  query: string, 
  params: any[] = []
): Promise<T | null> => {
  const results = await executeQuery<T>(query, params);
  return results.length > 0 ? results[0] : null;
};

// Insert data and return the ID
export const insert = async (
  table: string, 
  data: Record<string, any>
): Promise<number> => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');
  
  const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
  
  try {
    const [result] = await pool.execute(query, values);
    const insertResult = result as mysql.ResultSetHeader;
    return insertResult.insertId;
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
};

// Update data in a table
export const update = async (
  table: string, 
  data: Record<string, any>, 
  whereClause: string, 
  whereParams: any[]
): Promise<number> => {
  const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(data), ...whereParams];
  
  const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
  
  try {
    const [result] = await pool.execute(query, values);
    const updateResult = result as mysql.ResultSetHeader;
    return updateResult.affectedRows;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

// Delete data from a table
export const remove = async (
  table: string, 
  whereClause: string, 
  whereParams: any[]
): Promise<number> => {
  const query = `DELETE FROM ${table} WHERE ${whereClause}`;
  
  try {
    const [result] = await pool.execute(query, whereParams);
    const deleteResult = result as mysql.ResultSetHeader;
    return deleteResult.affectedRows;
  } catch (error) {
    console.error("Database delete error:", error);
    throw error;
  }
};

export default {
  executeQuery,
  querySingle,
  insert,
  update,
  remove,
  isMySQLConfigured
};
