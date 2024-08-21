import client from "@db/db.pg";

import type { Blog as BlogType } from "./blog.types";
import type { CreateBlogInputReq, GetBlogInputReq } from "./blog.schemas";

abstract class BlogServices {
	abstract create(data: CreateBlogInputReq["body"]): Promise<string>;
	abstract get(data: GetBlogInputReq["query"]): Promise<BlogType>;
	abstract getById(id: string): Promise<BlogType>;
	abstract deleteAll(): Promise<void>;
}

export class PgBlogServices implements BlogServices {
	async create(data: CreateBlogInputReq["body"]): Promise<string> {
		const blogId = (
			await client.query(
				"INSERT INTO blog (name, slug) VALUES ($1, $2) RETURNING id",
				[data.name, data.slug]
			)
		).rows[0].id;

		if (data.posts) {
			data.posts.forEach(async (post) => {
				await client.query(
					"INSERT INTO post (title, content, blog_id) VALUES ($1, $2, $3)",
					[post.title, post.content, blogId]
				);
			});
		}

		return blogId;
	}
	async get(data: GetBlogInputReq["query"]): Promise<BlogType> {
		const { rows } = await client.query(
			"SELECT * FROM blog WHERE id = $1 OR slug = $2",
			[data.id, data.slug]
		);

		const blogData = rows[0];
		if (data.includePosts) {
			const { rows: posts } = await client.query(
				"SELECT * FROM post WHERE blog_id = $1",
				[blogData.id]
			);
			return { ...blogData, posts };
		}

		return blogData;
	}

	async getById(id: string): Promise<BlogType> {
		const { rows } = await client.query(
			"SELECT * FROM blog WHERE id = $1",
			[id]
		);
		return rows[0];
	}
	async deleteAll(): Promise<void> {
		await client.query("DELETE FROM blog");
	}
}
