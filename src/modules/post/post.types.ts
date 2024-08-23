export type CreatePost = {
	title: string;
	content: string;
	blogId: string;
};
export type Post = {
	id: string;
	title: string;
	content: string;
	viewCount: number;
	blogId: string;
};
