import express from 'express';
import { homeController} from '../controller/homeController.js';

const routes = express.Router();

routes.get('/', homeController)

export default routes;
