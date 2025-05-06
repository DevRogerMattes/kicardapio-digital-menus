
// Browser-compatible MySQL adapter
// This file provides mock implementations for MySQL functions to work in browser environments

import { toast } from 'sonner';

// Type definitions for our database operations
export type QueryResult<T = any> = T[];
export type SingleResult<T = any> = T | null;
export type ResultSetHeader = { insertId: number; affectedRows: number };

// Check if MySQL is configured
export const isMySQLConfigured = async (): Promise<boolean> => {
  // In browser environment, we'll always return false
  console.log("MySQL operations not available in browser environment");
  return false;
};

// Execute a query with parameters
export const executeQuery = async <T>(
  query: string, 
  params: any[] = []
): Promise<T[]> => {
  console.log(`Mock executeQuery: ${query}`, params);
  // Return empty array for browser environment
  return [] as T[];
};

// Get a single row from a query
export const querySingle = async <T>(
  query: string, 
  params: any[] = []
): Promise<T | null> => {
  console.log(`Mock querySingle: ${query}`, params);
  // Return null for browser environment
  return null as T | null;
};

// Insert data and return the ID
export const insert = async (
  table: string, 
  data: Record<string, any>
): Promise<number> => {
  console.log(`Mock insert into ${table}:`, data);
  // Return a mock ID for browser environment
  return Date.now();
};

// Update data in a table
export const update = async (
  table: string, 
  data: Record<string, any>, 
  whereClause: string, 
  whereParams: any[]
): Promise<number> => {
  console.log(`Mock update ${table}:`, data, whereClause, whereParams);
  // Return a mock affected rows count
  return 1;
};

// Delete data from a table
export const remove = async (
  table: string, 
  whereClause: string, 
  whereParams: any[]
): Promise<number> => {
  console.log(`Mock delete from ${table}:`, whereClause, whereParams);
  // Return a mock affected rows count
  return 1;
};

export default {
  executeQuery,
  querySingle,
  insert,
  update,
  remove,
  isMySQLConfigured
};
