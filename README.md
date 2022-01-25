NFT.com Backend

Live GraphQL Link:- http://nftcom-env.eba-4d57f7ab.us-east-1.elasticbeanstalk.com/graphql

To Run Application:

create a .env file and add the following variables:

```
WEB3_PROVIDER=wss://mainnet.infura.io/ws/v3/cc77f7e53cb24e1498b37bbed4007582 (Can be replaced with any provider of your choice)
CONTRACT_ADDRESS=0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D (Can be replaced with any address of your choice)
```

Database information can be replaced with any working Postgres configuration
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_TABLE=transfers
```

Run the sql script located in `./src/db_create.sql` in postgres server to create tables or copy and paste command into a postgres terminal

- sudo -u postgres psql -d transfers -a -f ./src/db_create.sql

Run the following commands to start server

- npm install
- npm run start

Once server is up and running, go to localhost:4000/graphql in your browser, to test graphql queries

Note:- When using the `getEventByTokenId` query, use the `return_value_token_id` that is present on the `EventType` as the value for the tokenId argument.

Future enhancements:

- Automated testing
- Pagination on blocks to handle all previous and future transactions. Currently only listening to latest events
- Debug & fix docker-compose setup, the connection kept dropping and due to time contraints I left it alone
