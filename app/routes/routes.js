import { clientRouter } from "./clientRoute.js";
import { agencyrouter } from "./agencyRoute.js";
import authenticateUser from "../middleware/authenticate.js";
import User from "../schemas/user.js";
import bcryptjs from "bcryptjs";
import Router from "express";
import { errorCodes } from "../middleware/globalErrorHandler.js";

export const router = Router();

router.use("/client", authenticateUser, clientRouter);
router.use("/agency", authenticateUser, agencyrouter);

// User Registration

router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // validate user input
        if (!(username && password)) throw { code: errorCodes.validationError, msg: 'All fields are required' }
        if (username.length < 3) throw { code: errorCodes.validationError, msg: 'UserName must be at least 3' }
        if (password.length < 6) throw { code: errorCodes.validationError, msg: 'Password must be at least 6' }

        // validating user is already existing or not
        const oldUser = await User.findOne({ username })
        if (oldUser) {
            throw { code: errorCodes.alreadyExist }
        }
        const encryptedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({ username, password: encryptedPassword })

        // Generating token
        const token = await user.generateToken()
        return res.status(200).send(token)
    } catch (err) {
        next(err)
    }
})

// User Login

router.post('/login', async (req, res, next) => {
    try {
        const body = req.body
        // validate user input
        if (!(body.username && body.password)) throw { code: errorCodes.validationError, msg: 'All fields are required' }
        const user = await User.findByCredentials(body.username, body.password)

        // Generating token
        const token = await user.generateToken()
        res.status(200).send(token)
    } catch (err) {
        if (err.code == "validationError") {
            next(err)
        } else {
            return res.status(401).send(err)
        }
    }
})