import z from "zod";
import { postContent } from "../post/post.schemas";
import { or } from "drizzle-orm";

export const createBlogSchema = z.object({
	body: z
		.object({
			name: z.string().max(255),
			slug: z.string().max(255),
			posts: z.array(z.object(postContent)).optional(),
		})
		.strict(),
});

export type CreateBlogInputReq = z.infer<typeof createBlogSchema>;

export const getBlogSchema = z.object({
	query: z
		.object({
			id: z.string().uuid().optional(),
			slug: z.string().optional(),
			includePosts: z
				.enum(["true", "false"])
				.optional()
				.transform((val) => val === "true"),
		})
		.strict()
		.refine((data) => data.id || data.slug, {
			message: "id or slug is required",
		}),
});

export type GetBlogInputReq = z.infer<typeof getBlogSchema>;
