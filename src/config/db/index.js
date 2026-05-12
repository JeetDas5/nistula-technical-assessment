import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize the database and create the messages table if it doesn't exist
export const initializeDatabase = async () => {
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      message_id UUID PRIMARY KEY,
      guest_name TEXT NOT NULL,
      source TEXT NOT NULL,
      message_text TEXT NOT NULL,
      query_type TEXT NOT NULL,
      drafted_reply TEXT NOT NULL,
      confidence_score NUMERIC(4, 2) NOT NULL,
      action TEXT NOT NULL,
      timestamp TIMESTAMPTZ,
      booking_ref TEXT,
      property_id TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};
