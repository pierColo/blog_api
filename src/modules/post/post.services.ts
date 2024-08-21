import type { CreatePost } from "./post.types";

import client from "@db/db.pg";

abstract class PostServices {
	abstract create(data: CreatePost): Promise<string>;
}

export class PgPostServices implements PostServices {
	async create(data: CreatePost): Promise<string> {
		return (
			await client.query(
				"INSERT INTO post (title, content, blog_id) VALUES ($1, $2, $3) RETURNING id",
				[data.title, data.content, data.blogId]
			)
		).rows[0].id;
	}
}
