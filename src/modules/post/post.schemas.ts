import { z } from "zod";

export const postContent = {
	title: z.string().max(255),
	content: z.string(),
};

export const createPostSchema = z.object({
	body: z
		.object({
			...postContent,
			blogId: z.string().max(255),
		})
		.strict(),
});

export type CreatePostSchemaReq = z.infer<typeof createPostSchema>;
