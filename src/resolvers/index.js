import { User } from '../models/users';
import messagesResolver from './messages';
import requestResolver from './requests';
import usersResolver from './users';

const resolvers = {
  Query: {
    ...usersResolver.Query
  },
  Mutation: {
    ...usersResolver.Mutation
  },
}

export default resolvers;