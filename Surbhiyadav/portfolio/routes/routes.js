import express from 'express';
import { homecontroller } from '../controllers/homecontroller.js';
const routes = express.Router();


routes.get('/',homecontroller)


export default routes;