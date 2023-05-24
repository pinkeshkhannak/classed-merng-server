import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

import validate from "../../util/validators.js";
import User from "../../models/User.js";
import MONGODB from "../../config.js";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    MONGODB.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

const userResolvers = {
  Mutation: {
    async login(_, { loginInput: { username, password } }) {
      const { valid, errors } = validate.validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const pass = await User.findOne({ username, password });
      if (!pass) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }
      const token = generateToken(user);
      console.log;

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      //TODO : validate user data
      const { valid, errors } = validate.validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      //todo : make sure user doesn't already exits
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      //todo : hash password and create an auth token
      // const hashPassword = bcrypt.genSalt(10, function(err, salt) {
      //     bcrypt.hash(password, salt, function(err, hash) {
      //         return hash;
      //     });
      // });
      const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

export default userResolvers;
