import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";
import configs from "../config/parameters";

const queryClient = postgres(configs.DATABASE_URL);
const db = drizzle(queryClient);

export { db };
