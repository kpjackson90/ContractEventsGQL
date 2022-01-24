import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

/**Event Type Definition */
export const EventType = new GraphQLObjectType({
  name: 'EventType',
  fields: () => ({
    id: { type: GraphQLID },
    log_index: { type: GraphQLInt },
    transaction_index: { type: GraphQLInt },
    transaction_hash: { type: GraphQLString },
    block_hash: { type: GraphQLString },
    block_number: { type: GraphQLInt },
    address: { type: GraphQLString },
    transaction_id: { type: GraphQLString },
    return_value_from: { type: GraphQLString },
    return_value_to: { type: GraphQLString },
    return_value_token_id: { type: GraphQLString },
    signature: { type: GraphQLString },
    read: { type: GraphQLBoolean },
  }),
});
