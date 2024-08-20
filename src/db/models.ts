import client from "@db/db.pg";
import { da } from "@faker-js/faker";

type Blog = {
    id: string;
    slug: string
    name: string
    posts: Post[]
}

type Post = {
    id: string
    title?: string
    content: string
    viewCount: number
    blogId: string
}

const p = {
    id: "",
    title: "",
    content: "",
    viewCount: 0,
    blogId: ""
}

const b = {
    id: "",
    slug: "",
    name: "",
    posts: [p]
}
type Select = keyof Blog


abstract class Blog2<T> {
    abstract create(): void
    abstract get(data: [keyof T]): void
}

class PgBlog implements Blog2<Blog> {
    create(): void {

    }
    get(data: [keyof Blog]): void {
        const query = {
            name: 'get-name',
            text: 'SELECT ',
            values: ['brianc'],
            rowMode: 'array',
          }
        client.query("SELECT * FROM blog",data)}
}
    const tmp = new PgBlog()
tmp.get(["id"])

    const db = {
        blog: new PgBlog()
    }