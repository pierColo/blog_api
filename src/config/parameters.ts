const configs = {
	DATABASE_URL: process.env.DATABASE_URL ?? "",
	PORT: process.env.PORT ?? 3000,
	HOST: process.env.HOST ?? "localhost",
} as const;

export default configs;
