import { PgBlogServices } from "../modules/blog/blog.services";
import { PgPostServices } from "../modules/post/post.services";
import { post } from "./schema";

enum ProviderList {
	PG = "pg",
}
const generateServices = (provider: ProviderList) => {
	switch (provider) {
		case ProviderList.PG:
			return {
				blog: new PgBlogServices(),
				post: new PgPostServices(),
			};
		default:
			throw new Error("Invalid provider");
	}
};

const services = generateServices(ProviderList.PG);

export default services;
