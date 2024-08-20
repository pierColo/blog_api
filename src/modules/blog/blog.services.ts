import { blog, post } from "@db/schema";
import { db } from "@db/db";
import { eq, or } from "drizzle-orm";

import type { CreateBlogInputReq, GetBlogInputReq } from "./blog.schemas";


export const createBlog = async (
	data: CreateBlogInputReq["body"]
): Promise<string> => {
	return await db.transaction(async (db) => {
		const blogId = (
			await db
				.insert(blog)
				.values({ ...data })
				.returning({ insertedId: blog.id })
		)[0].insertedId;

		if (data.posts) {
			await db.insert(post).values(
				data.posts.map((post) => ({
					...post,
					blogId,
				}))
			);
		}

		return blogId;
	});
};

export const getBlog = async (data: GetBlogInputReq["query"]) => {
	const blogData = (
		await db
			.select({
				id: blog.id,
				name: blog.name,
				slug: blog.slug,
			})
			.from(blog)
			.where(
				or(
					data.id ? eq(blog.id, data.id) : undefined,
					data.slug ? eq(blog.slug, data.slug) : undefined
				)
			)
	)[0];

	if (data.includePosts) {
		const posts = await db
			.select({
				id: post.id,
				title: post.title,
				content: post.content,
				viewCount: post.viewCount,
			})
			.from(post)
			.where(eq(post.blogId, blogData.id))
			.$dynamic();
		return { ...blogData, posts };
	}

	return blogData;
};

export const getBlogById = async (
	blogId: string
): Promise<{
	name: string;
	slug: string;
	id: string;
}> => {
	return (
		await db.select().from(blog).where(eq(blog.id, blogId)).$dynamic()
	)[0];
};
