import Users from '@sequelizeModels/Users.model';
import {UserLoginPayload, UserPayload} from '@expressModels/users/users';
import {userSchema, userLoginSchema} from '@joiSchemas/users/users.joi';

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

export const loginUser = async (userLoginPayload : UserLoginPayload) : Promise<Users | Error> => {
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
      throw new Error('Invalid username or password');
    }
    return user;
  } catch ( error ) {
    console.error( 'Error logging in user:', error );
    throw error;
  }
}
