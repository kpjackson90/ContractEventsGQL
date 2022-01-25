import { app } from './app';
require('dotenv').config();
import { myContract } from './services/web3';
import { DatabaseConnectionError } from './middlewares';
import {
  createConnection,
  Connection,
  getConnection,
  getConnectionManager,
} from 'typeorm';
import { Event } from './entities/event';
import { logger } from './middlewares';

const start = async () => {
  /**Checks to ensure that ENV Variables are defined */
  if (!process.env.WEB3_PROVIDER) {
    throw new Error('WEB3_PROVIDER must be defined');
  }

  if (!process.env.CONTRACT_ADDRESS) {
    throw new Error('CONTRACT_ADDRESS must be defined');
  }

  if (!process.env.DATABASE_HOST) {
    throw new Error('DATABASE_HOST must be defined');
  }

  if (!process.env.DATABASE_PORT) {
    throw new Error('DATABASE_PORT must be defined');
  }

  if (!process.env.DATABASE_USERNAME) {
    throw new Error('DATABASE_USERNAME must be defined');
  }

  if (!process.env.DATABASE_PASSWORD) {
    throw new Error('DATABASE_PASSWORD must be defined');
  }

  if (!process.env.DATABASE_TABLE) {
    throw new Error('DATABASE_TABLE must be defined');
  }

  let connection: Connection;

  try {
    /**Check to see if an connection has been created */
    if (!getConnectionManager().has('default')) {
      /**Create connection if one does not exist */
      connection = await createConnection({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_TABLE,
        entities: [Event],
      });
    } else {
      /**Get existing connection */
      connection = getConnection();
    }
  } catch (err: any) {
    throw new DatabaseConnectionError();
  }

  logger.log({
    level: 'info',
    message: `Database is ${
      connection?.isConnected ? 'connected' : 'not connected'
    }`,
  });

  /**Poll contract events */
  myContract.events
    .Transfer({ fromBlock: 'latest' })
    .on('data', async (event: any) => {
      logger.log({
        level: 'info',
        message: `Saving New Transfer Event: ${event.id}`,
      });

      /**Save incoming events */
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Event)
        .values([
          {
            log_index: event.logIndex,
            transaction_index: event.transactionIndex,
            transaction_hash: event.transactionHash,
            block_hash: event.blockHash,
            block_number: event.blockNumber,
            address: event.address,
            transaction_id: event.id,
            return_value_from: event.returnValues.from,
            return_value_to: event.returnValues.to,
            return_value_token_id: event.returnValues.tokenId,
            event_type: event.event,
            signature: event.signature,
            read: false,
          },
        ])
        .execute();

      logger.log({ level: 'info', message: 'New Event Saved to Database' });
    })
    .on('changed', (changed: any) =>
      logger.log({ level: 'info', message: changed })
    )
    .on('error', (err: any) =>
      logger.log({ level: 'error', message: err.message })
    )
    .on('connected', (str: any) =>
      logger.log({ level: 'info', message: `Connected to ${str}` })
    );

  app.listen(4000, () => {
    logger.log({ level: 'info', message: 'Server Running on Port 4000' });
  });
};

start();
