import { clientRouter } from "./clientRoute.js";
import { agencyrouter } from "./agencyRoute.js";
import authenticateUser from "../middleware/authenticate.js";
import User from "../schemas/user.js";
import Router from "express";
import bcryptjs from "bcryptjs";

export const router = Router();

router.use("/client", authenticateUser, clientRouter);
router.use("/agency", authenticateUser, agencyrouter);

// User Registration

router.post('/register', async function (req, res) {
    try {
        const { username, password } = req.body;

        // validate user input
        if (!username && password) { return res.status(400).send("All input is required") }

        if (username.length < 3) { return res.status(400).send("UserName Must be At least 3") }

        // validating user is already existing or not
        const oldUser = await User.findOne({ username })
        if (oldUser) {
            return res.status(400).send(`User "${username}" Already Exist. Please Login`)
        }
        const encryptedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({ username, password: encryptedPassword })

        // Generating token

        const token = await user.generateToken()
        return res.status(200).send(token)
    } catch (err) {
        return res.status(400).send(err.message)
    }
})

// User Login 

router.post('/login', async (req, res, next) => {
    try {
        const body = req.body
        // validate user input
        if (!body.username && body.password) { return res.status(400).send("All input is required") }

        const user = await User.findByCredentials(body.username, body.password)
        // Generating token
        const token = await user.generateToken()
        res.status(200).send(token)
    } catch (err) {
        return res.status(400).send(err)
    }
})