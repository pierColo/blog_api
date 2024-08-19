import { defineConfig } from "drizzle-kit";
import configs from "./src/config/parameters";

export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: configs.DATABASE_URL,
	},
});
