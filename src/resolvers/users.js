import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import { UserInputError } from 'apollo-server-express';
import { validateRegister } from '../validation';

const usersResolver = {
  Mutation: {
    register: async (_, args) => {

      const { errors, isValid } = validateRegister(
        args.username,
        args.password,
        args.confirmPassword
      )
      if(!isValid) {
        throw new UserInputError('Errors', { errors })
      }

      const exists = await User.findOne({username: args.username});
      if(exists) {
        throw new UserInputError('Errors', {errors: {username: "This username is taken."}})
      }

      const password = await bcrypt.hash(args.password, 12);

      const user = new User({
        username: args.username, 
        password
      })

      const res = await user.save();

      const token = jwt.sign({
        id: res._id,
        username: res.username
      }, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
    login: async (_, args) => {

      const user = await User.findOne({ username: args.username });
      if(!user) {
        throw new UserInputError('Authentication.', {errors: {Auth: "Invalid credentials."}})
      }
      
      const match = await bcrypt.compare(args.password, user.password);
      if(!match) {
        throw new UserInputError('Authentication.', {errors: {Auth: "Invalid credentials."}})
      }

      const token = jwt.sign({
        id: user._id,
        username: user.username
      }, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});

      return {
        ...user._doc,
        id: user._id,
        token
      };
    }
  }
}

export default usersResolver;