import express, { Router } from "express";
import { login, register } from "../controllers/user";

const router: Router = express.Router()

// router.use('/', test)

router.use('/login', login)
router.use('/register', register)

export default router