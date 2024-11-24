import express from "express"
import {fetch, create} from "../controller/controller.js"

const route = express.Router();

route.post("/create", create);
route.get("/getAllUser",fetch)

export default route;