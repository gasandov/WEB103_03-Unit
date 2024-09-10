import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pg from "pg";

dotenv.config({ path: ".env" });

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

console.log("config: ", config);

const pool = new pg.Pool(config);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events", async (req, res) => {
  console.log("hey");
  try {
    const { rows } = await pool.query("SELECT * FROM events");

    console.log("rows", rows);

    return res.json(rows);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
