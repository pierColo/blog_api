import type { Post } from "../post/post.types";

export type CreateBlog = {
	name: string;
	slug: string;
};
export type Blog = {
	id: string;
	name: string;
	slug: string;
	posts: Post[];
};
