import express from "express";
import blogRouter from "./modules/blog/blog.routes";
import postRouter from "./modules/post/post.routes";
import bodyParser from "body-parser";
import { errorHandler } from "@middlewares/errorHandling";

const createServer = () => {
	const app = express();

	app.get("/", (_, res) => {
		res.status(200).send("HealthCheck OK");
	});

	app.use(bodyParser.json());

	app.use("/api/blogs", blogRouter);
	app.use("/api/posts", postRouter);

	app.use((_, res) => {
		res.status(404).send("Not Found");
	});

	app.use(errorHandler);
	return app;
};

export default createServer;
