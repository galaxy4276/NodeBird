import express from 'express';
import routes from '../routes';
import { join, userProfile, root } from '../controllers/pageController';
import { isLoggedIn, isNotLoggedIn } from '../controllers/middlewares';


const pageRouter = express.Router();


pageRouter.get(routes.root, root);
pageRouter.get(routes.profileDetail, isLoggedIn, userProfile);
pageRouter.get(routes.join, isNotLoggedIn, join);


export default pageRouter;