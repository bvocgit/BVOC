import express from 'express';
import { homecontroller, ContactUserController } from '../controllers/homecontroller.js';
const routes = express.Router();

routes.get("/", homecontroller)
routes.post('/',ContactUserController)

export default routes;