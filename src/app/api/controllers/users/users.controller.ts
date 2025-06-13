import Users from '@sequelizeModels/Users.model';
import { UserPayload } from '@expressModels/users';
import userSchema from '@joiSchemas/users/users.joi';

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
