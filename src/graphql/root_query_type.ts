import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { EventType } from './event_type';
import { getConnection } from 'typeorm';
import { Event } from '../entities/event';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    /**Get All Events*/
    events: {
      type: new GraphQLList(EventType),
      resolve() {
        return getConnection()
          .createQueryBuilder()
          .select('*')
          .from(Event, 'event')
          .execute();
      },
    },
    /**Get A Single Event */
    event: {
      type: EventType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return getConnection()
          .createQueryBuilder()
          .select('event')
          .from(Event, 'event')
          .where('event.id = :id', { id })
          .getOne();
      },
    },
    /**Get An Event By Ethereum Address */
    getEventByAddress: {
      type: EventType,
      args: { address: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { address }) {
        return getConnection()
          .createQueryBuilder()
          .select('event')
          .from(Event, 'event')
          .where('event.address = :address', { address })
          .getOne();
      },
    },
    /**Get An Event By Token Id */
    getEventByTokenId: {
      type: EventType,
      args: { tokenId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { tokenId }) {
        return getConnection()
          .createQueryBuilder()
          .select('event')
          .from(Event, 'event')
          .where('event.return_value_token_id = :return_value_token_id', {
            return_value_token_id: tokenId,
          })
          .getOne();
      },
    },
    /**Get All Unread Events */
    getAllUnreadEvents: {
      type: new GraphQLList(EventType),
      resolve() {
        return getConnection()
          .createQueryBuilder()
          .select('*')
          .from(Event, 'event')
          .where('event.read = :read', { read: false })
          .execute();
      },
    },
  }),
});
