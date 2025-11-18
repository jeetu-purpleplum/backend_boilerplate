import { Router } from "express"
import userController from "../controllers/users/usersController";

const router = Router();


router.use("/users", userController);

export default router;