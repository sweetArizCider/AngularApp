import Router, { Request , Response } from 'express'
import { createUser} from '@expressControllers/users/users.controller';


const router = Router()


router.post('/users', async (req : Request, res : Response) => {
  const userPayload = req.body


  if( !userPayload ) {
    res.status(400).json({ error: 'Bad Request: User payload is required' });
    return;
  }


  try {
    const newUser = await createUser(userPayload);
    if (newUser instanceof Error) {
      res.status(400).json({ error: newUser.message });
      return;
    }


    res.status(201).json(newUser);
    return
  }catch(err){
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }

})


export default router;
