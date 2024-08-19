import { db } from "@db/db";
import createServer from "../src/server";
import supertest from "supertest";
import { blog, post } from "@db/schema";
import { eq } from "drizzle-orm";
import { faker } from "@faker-js/faker";
import { createBlog } from "../src/modules/blog/blog.services";
const app = createServer();

describe("E2E test", () => {
	describe("Post /blogs", () => {
		describe("Given a valid name and slug", () => {
			it("should return 200 and create a new blog", async () => {
				const response = await supertest(app)
					.post("/api/blogs")
					.send({
						name: faker.string.alphanumeric(10),
						slug: faker.string.alphanumeric(10),
					});
				expect(response.status).toBe(201);
				console.log(response.body.data.id);
			});
		});

		describe("Given an already used slug", () => {
			it("should return 400 ", async () => {
				const slug = faker.string.alphanumeric(10);
				await createBlog({
					name: faker.string.alphanumeric(10),
					slug: slug,
				});
				const response = await supertest(app)
					.post("/api/blogs")
					.send({
						name: faker.string.alphanumeric(10),
						slug: slug,
					});
				expect(response.status).toBe(400);
			});
		});
	});
	describe("Post /posts", () => {
		describe("Given a valid title and content and a valid blogId", () => {
			it("should return 200 and create a new post", async () => {
				const blogId = await createBlog({
					name: faker.string.alphanumeric(10),
					slug: faker.string.alphanumeric(10),
				});
				const response = await supertest(app)
					.post("/api/posts")
					.send({
						title: faker.string.alphanumeric(10),
						content: faker.string.alphanumeric(10),
						blogId,
					});
				expect(response.status).toBe(201);
			});
		});

		describe("Given an invalid blogId", () => {
			it("should return 400", async () => {
				const response = await supertest(app)
					.post("/api/posts")
					.send({
						title: faker.string.alphanumeric(10),
						content: faker.string.alphanumeric(10),
						blogId: faker.string.uuid(),
					});
				expect(response.status).toBe(400);
			});
		});
	});

	describe("Get /blogs", () => {
		describe("Given a valid blogId", () => {
			it("should return 200 and the blog", async () => {
				const name = faker.string.alphanumeric(10);
				const slug = faker.string.alphanumeric(10);

				const blogId = await createBlog({
					name,
					slug,
				});
				const response = await supertest(app).get(
					`/api/blogs?id=${blogId}`
				);

				expect(response.status).toBe(200);
				expect(response.body.data).toEqual({
					id: blogId,
					name,
					slug,
				});
			});
		});
		describe("Given a valid slug", () => {
			it("should return 200 and the blog", async () => {
				const name = faker.string.alphanumeric(10);
				const slug = faker.string.alphanumeric(10);

				const blogId = await createBlog({
					name,
					slug,
				});
				const response = await supertest(app).get(
					`/api/blogs?slug=${slug}`
				);

				expect(response.status).toBe(200);
				expect(response.body.data).toEqual({
					id: blogId,
					name,
					slug,
				});
			});
		});
		describe("Given an invalid blogId", () => {
			it("should return 400", async () => {
				const response = await supertest(app).get(
					`/api/blogs?id=${faker.string.uuid()}`
				);
				expect(response.status).toBe(400);
			});
		});

		describe("Given the filter includePosts", () => {
			it("should return 200 and the blog with posts", async () => {
				const name = faker.string.alphanumeric(10);
				const slug = faker.string.alphanumeric(10);

				const blogId = await createBlog({
					name,
					slug,
					posts: [
						{
							title: faker.string.alphanumeric(10),
							content: faker.string.alphanumeric(10),
						},
						{
							title: faker.string.alphanumeric(10),
							content: faker.string.alphanumeric(10),
						},
					],
				});
				const response = await supertest(app).get(
					`/api/blogs?id=${blogId}&includePosts=true`
				);

				expect(response.status).toBe(200);
				expect(response.body.data).toEqual({
					id: blogId,
					name,
					slug,
					posts: [
						{
							id: expect.any(String),
							title: expect.any(String),
							content: expect.any(String),
							viewCount: 0,
						},
						{
							id: expect.any(String),
							title: expect.any(String),
							content: expect.any(String),
							viewCount: 0,
						},
					],
				});
			});
		});

		describe("Given no filter", () => {
			it("should return 400", async () => {
				const response = await supertest(app).get(`/api/blogs`);
				expect(response.status).toBe(400);
			});
		});
	});
	afterAll(async () => {
		await db.delete(post);
		await db.delete(blog);
	});
});
