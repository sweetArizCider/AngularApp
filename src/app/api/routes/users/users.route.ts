import Router, { Request , Response } from 'express'
import { createUser , loginUser} from '@expressControllers/users/users.controller';


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

router.post('/users/auth', async (req : Request, res : Response) => {
  const userLoginPayload = req.body
  if( !userLoginPayload ) {
    res.status(400).json({ error: 'Bad Request: User login payload is required' });
    return;
  }

  try{
    const user = await loginUser(userLoginPayload)
    if (user instanceof Error) {
      res.status(400).json({error: user.message});
      return;
    }
    res.status(200).json(user);
    return;
  }catch(err){
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }

})


export default router;
