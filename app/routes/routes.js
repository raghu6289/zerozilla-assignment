import { clientRouter } from "./clientRoute.js";
import { agencyrouter } from "./agencyRoute.js";
import authenticateUser from "../middleware/authenticate.js";
import User from "../schemas/user.js";

import Router from "express";

export const router = Router();

router.use("/client", authenticateUser, clientRouter);
router.use("/agency", authenticateUser, agencyrouter);

router.post('/login', async function(req, res, next){
    try{
        const body = req.body
        const user = await User.findByCredentials(body.username, body.password)
        const token = await user.generateToken()
        res.send(token)
    }catch(err){
        next()
    } 
})

router.post('/register', async function(req, res, next){
    try{
        const {username, password} = req.body;
        const user = await User.create({username,password})
        return res.send("User created")
    }catch(err){
        next()      
    }
})