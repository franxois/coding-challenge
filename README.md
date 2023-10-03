# Riot Coding Challenge:

After each challenge you can take a 10 minutes break 😇

## Application debugging (1h)

This an REST API created using Hono : https://hono.dev

This app was created with multiple bugs. Your goal is to find and fix the bugs in the App

## Getting started

Before you start you need to have the following tools installed

- NodeJS

Using node package manager (npm, yarn or pnpm)

`npm install`

Generate prisma client:

`npm run db:generate`

And then run :

`npm run start`

This will start the server in watch mode on port 3000

For testing you have `.http` files in `test` folder. Install the VSCode extension `REST Client` https://marketplace.visualstudio.com/items?itemName=humao.rest-client to run them.

## App overview :

This app was created to track customer purchases.

In our database we have the following :

- Product

- User

- Purchase

For more info check the schema in `prisma/schema.prisma`

A customer can purchase a product. This will create a new entry in the purchase table of our database

## Objectives

Your task is to fix all the bugs so application runs as intended. Here is what is expected from the application to do:

- Get all the products in the database - `GET /products` returns all the products in the database.

- Obtain information about a product using their ID - `GET /products/:id` returns the specific product - If the product is not found, an error is returned with the correct HTTP status code.

- Get all the customers in the database - `GET /customers` returns all the customers in the database. (If this were a production API, what suggestions would you add?).

- Make a purchase using `customerId` and `productId` - `POST /purchases` expects a JSON object `{"customerId": "CUSTOMER_ID", "productId": "PRODUCT_ID"}`

- Sync products from a 3rd party service. We want to call a 3rd party service API to fetch all the product updates made on their service and sync that information in our database. We want to make sure that we either sync all the data or none (aka if one sync to the database fails the other products should not be updated/persisted) using the `POST /sync`.

- Get the statistics:

  - `GET /purchases/stats/products?from=21-04-2023&to=21-05-2023` should return the products purchased between from: Date and to: Date. from should always be before to. Both dates are formatted in 'dd-MM-yyyy' format.

  - `GET /purchases/stats/customers` should return the customers who have not made purchases in the past year.

## SQL challenge (40 minutes)

1. Ask Louis for an access to the database server.

2. Your goal is to write an SQL query to find Riot's inactive workspaces, this query should meet the following criteria:

- The workspace should not be a paid workspace (`stripe_subscription_id != null`)

- 1 year without a user connecting to the workspace (`user_workspaces.user_last_seen`)

- No phishing emails sent for 1 year (`attacks.created_at`)

- No enrolments created for 1 year (`enrolments.created_at`)

3. The output of the exercise should be the SQL query itself.

4. (Bonus point), return the criterion column that will tell why this workspace should be deleted

## Architecture challenge (40 minutes)

Currently, our system is utilizing the [HIBP API](https://haveibeenpwned.com/) to fetch details pertaining to data breaches for our employees' email addresses. In order to obtain this data, an API call is made to the HIBP API each time a new email address is added to our platform. 

It should be noted that, based on our subscription plan, HIBP API enacts a rate limit on each API key which stipulates the permissible number of requests that can be made per minute (eg. For the cheapest plan it's 1 request per 6 seconds). 

Based on your knowledge, We need an architectural solution that can adeptly manage this rate limit in scenarios where one or more API keys are employed simultaneously across one or more worker processes. Can you propose a solution that would be capable of navigating this rate limit to maintain optimal system functionality?

## Debriefing (1 hour)

- Meet the team

- Ask your questions

- Talk about your past projects

- Tell us what excites you

## Meeting with ben (30 minutes)

- Culture talk

- Company Vision

- Other questions
