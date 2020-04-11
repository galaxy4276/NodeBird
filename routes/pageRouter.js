import express from 'express';
import routes from '../routes';
import { join, userProfile, root } from '../controllers/pageController';

const pageRouter = express.Router();


pageRouter.get(routes.root, root);
pageRouter.get(routes.profileDetail, userProfile);
pageRouter.get(routes.join, join);


export default pageRouter;