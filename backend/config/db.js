import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
     connectionString: import.meta.env.DATABASE_URL,
});

pool.connect()
    .then(() => {
        console.log("✅ PostgreSQL Connected");
    })
    .catch((err) => {
        console.log("❌ Database Connection Failed");
        console.error(err.message);
    });

export default pool;