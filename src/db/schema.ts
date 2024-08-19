import { integer, pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const blog = pgTable("blog", {
	id: uuid("id").defaultRandom().primaryKey(),
	slug: varchar("slug", { length: 256 }).notNull().unique(),
	name: varchar("name", { length: 256 }).notNull(),
});

export const blogRelations = relations(blog, ({ many }) => ({
	posts: many(post),
}));

export const post = pgTable("post", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: text("title"),
	content: text("content").notNull(),
	viewCount: integer("viewCount").default(0),
	blogId: uuid("blog_id").references(() => blog.id),
});

export const postRelations = relations(post, ({ one }) => ({
	blog: one(blog, {
		fields: [post.blogId],
		references: [blog.id],
	}),
}));

export type InsertBlog = typeof blog.$inferInsert;
