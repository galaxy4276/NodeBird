import express from 'express';
import { isLoggedIn } from '../controllers/middlewares';
import { User } from '../models';

const userRouter = express.Router();


userRouter.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id }});
    await user.addFollowing(parseInt(req.params.id, 10));
    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
})



export default userRouter;
