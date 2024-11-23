import express from 'express';
import { homeController } from '../controllers/homeController.js';

const routes = express.Router();

routes.get('/', homeController);
console.log(homeController); // Should log the function definition


export default routes;
