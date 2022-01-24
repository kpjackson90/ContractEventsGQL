import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { Event } from '../entities/event';
import { EventType } from './event_type';
import { getConnection } from 'typeorm';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    markAsRead: {
      type: EventType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, { id }) {
        /**Set Read to true */
        return getConnection()
          .createQueryBuilder()
          .update(Event)
          .set({ read: true })
          .where('id = :id', { id })
          .execute();
      },
    },
  },
});
