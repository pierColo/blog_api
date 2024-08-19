# Usage

To start :
```
bun i 
```

To run a new postgres db :
```
docker-compose up
```

Sync db to the code schema
```
bunx drizzle-kit generate
bunx drizzle-kit migrate
```
To spin up the server
```
npm run start
```
To run tests : 
```
bun test
```
# Bonus 

Given the timing, I believe my implementation is not ideal for easily swapping databases, even if only the services are to change in the application. The types are custom, so there are no dependencies on a third-party tool like Drizzle.

My possible solutions could be:

- Use an ORM that facilitates database migration and minimizes the code changes required (such as Prisma, Drizzle ORM, or Sequelize).
- Build an abstract class for each feature, which would be implemented by a class based on the database type. This approach would help with typing and testing since an abstract class has defined types and return values to satisfy, causing less "headache" when migrating.

In both cases the migration would requires a review of the database schema and queries.

Migrating databases, in my experience, is always painful, so I would ask more questions about the new type of database and make decisions based on that. Moving from a SQL database to a NoSQL one could be challenging in many cases.

# Answers

> What were some of the reasons you chose the technology stack that you
did?

Technologies chosen :
- TS with bun 
- Postgresql 

Library chosen :
- drizzle ORM -> db integration
- Zod -> validation
- ExpressJS -> api framework
- Pino -> Logging

I chose TypeScript as the programming language primarily because it's the one I'm most productive with. It also has strong community support and seamless integration with modern JavaScript libraries.

Bun is currently my go to option as the runtime environment due to its simplicity and ease of configuration, which allows for quick project setup and development.

For the database, I opted for PostgreSQL because a SQL database aligns well with the project's requirements. PostgreSQL is my preferred SQL database due to its rich feature set, including support for a wide range of data types

>What were some of the trade-offs you made when building this application?
Why were these acceptable trade-offs?

JavaScript (specifically with Bun and Node.js) is often critiqued for not being the most performant language for server-side operations. Despite this, JavaScript is a versatile and widely-used language with a massive ecosystem, making it an excellent choice for rapid development. Given the problem domain, where performance bottlenecks are more likely to occur in the database layer rather than the application logic, using JavaScript is a reasonable compromise

 PostgreSQL, while highly capable, isn't always the top choice for handling extremely large datasets or massive-scale operations, where specialized databases like Cassandra or MongoDB might perform better.
 However, PostgreSQL is known for its reliability, and strong support for complex queries and data integrity, making it suitable for the vast majority of applications.

These trade-offs were acceptable because the chosen technologies align well with the project’s requirements and expected scale. JavaScript provides a rapid development environment with vast community support, and PostgreSQL offers a robust and versatile database solution capable of handling the expected load effectively. I do belive that this tech stack could easy manage milions of users

>Given more time, what improvements or optimizations would you want to
add? When would you add them?
###
The current application would require on a code level :
- better error handling ( currently managed quickly)
- better logging
- better security adjustments (es. purify post content from possible xss)
- add analitycs and metrics tracking
- better types especially for http responses

On a product level I would propably complete the CRUD for posts and blogs 


>What would you need to do to make this application scale to hundreds of
thousands of users?
###

This application is relatively straightforward, so scaling it to handle hundreds of thousands of users can be achieved through a combination of several strategies:
- CDN caching ->  This approach is particularly effective for reducing server strain and improving performance at scale.
- Fast memory Caching (Redis) -> Redis provides lightning-fast data retrieval by storing data in memory, which can dramatically reduce the load on the database and improve response times
- Load balancer and multiple istances with autoscaling -> load balancer to distribute incoming requests evenly across multiple instances. It also helps maintain performance during peak usage times and optimizes costs by scaling down during low traffic periods
- DB connection pooling and serverless db-> Implementing connection pooling to efficiently manage database connections, reducing the overhead of opening and closing connections frequently and leveraging a serverless database solution like NeonDB, which offers auto-scaling capabilities and built-in connection pooling

>How would you change the architecture to allow for models that are stored
in different databases? E.g. posts are stored in Cassandra and blogs are
stored in Postgres.
###
Using the Cassandra and Postgres example I would problably use the unique Blog_id in the cassandra db to filter and get the post with the blog_id. At the same time I would keep both db updated with the same data using postgres for creation and replicate data on cassandra and using cassandra as the primary database to serve users due to the high traffic

>How would you deploy the Architecture you designed in a production ready way?
###

As a starting point, I would deploy the server and the database to two separate VPS instances (such a Digital Ocean or Render) and adding a WAF(cloudflare, fastly) and reverse proxy in front of the server. And then slowly using more of strategies said above at every need