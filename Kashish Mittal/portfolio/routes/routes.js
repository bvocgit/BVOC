import express from 'express';
import {homeController} from '../controlllers/homeController.js';
const routes=express.Router();



routes.get('/', homeController)

export default routes ;