import configs from "./config/parameters";
import logger from "./utils/logger";
import createServer from "./server";

const app = await createServer();

app.listen({ port: configs.PORT, host: configs.HOST }, async () => {
	logger.info(`Server listening at http://${configs.HOST}:${configs.PORT}`);
});
