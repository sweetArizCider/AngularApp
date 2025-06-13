import joi , { ObjectSchema } from 'joi';
import { User } from '@expressModels/users';

const userSchema : ObjectSchema<User> = joi.object( {
  username: joi.string().min( 3 ).max( 50 ).required() ,
  email: joi.string().email().required() ,
  password: joi.string().min( 3 ).max( 20 ).required() ,
} )

export default userSchema;
