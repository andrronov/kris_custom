import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as dbSchema from "@kris-customs/shared/db";
import * as relations from "../../drizzle/relations";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);
const schema = { ...dbSchema, ...relations };

export const db = drizzle({ client: sql, schema });
