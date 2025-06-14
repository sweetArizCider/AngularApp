import Users from '@sequelizeModels/Users.model';
import {UserLoginPayload, UserPayload, UserWithToken} from '@expressModels/users/users';
import {userSchema, userLoginSchema} from '@joiSchemas/users/users.joi';
import { config } from 'dotenv'
config();
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env['SECRET']
const JWT_OPTIONS = { expiresIn: 600 };

export const createUser = async (userPayload : UserPayload) : Promise<Users | Error> => {
  try {
    const { error } = userSchema.validate(userPayload);
    if( error ) {
      return new Error(`Validation error: ${error.message}`);
    }
    return await Users.create( userPayload );
  } catch ( error ) {
    console.error( 'Error creating user:', error );
    throw error;
  }
}

export const loginUser = async (userLoginPayload : UserLoginPayload) : Promise<UserWithToken | Error> => {
  try {
    const { error } = userLoginSchema.validate(userLoginPayload);
    if( error ) {
     return Error(`Validation error: ${error.message}`);
    }
    const user = await Users.findOne({
      where: {
        username: userLoginPayload.username,
        password: userLoginPayload.password
      }
    });


    if (!user) {
      return Error('Invalid username or password');
    }

    if( !JWT_SECRET ) {
      return Error('JWT_SECRET is not defined in environment variables');
    }

    const plainUser = user.toJSON() ?? user.get({ plain: true });

    const token = jwt.sign(plainUser, JWT_SECRET, JWT_OPTIONS);

    return { user , token};
  } catch ( error ) {
    console.error( 'Error logging in user:', error );
    throw error;
  }
}
