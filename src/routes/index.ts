import { Request, Response, Router } from "express"
import userController from "../controllers/users/usersController";
import customerController from "../controllers/customers/customersController";
import cardsController from "../controllers/cards/cardsController";
import { decryptAsync, decryptionMiddleware, encryptionMiddleware } from "../middlewares/encryption";
import transactionsController from "../controllers/transactions/transactionsController";
import accountsController from "../controllers/accounts/accountsController";

const router = Router();

router.post("/decrypt", async (req: Request, res: Response) => {
    const d = await decryptAsync(req.body?.data);
    res.send(d);
})
router.use("/accounts", decryptionMiddleware, accountsController, encryptionMiddleware);
router.use("/customers", decryptionMiddleware, customerController, encryptionMiddleware);
router.use("/cards", decryptionMiddleware, cardsController, encryptionMiddleware);
router.use("/transactions", decryptionMiddleware, transactionsController, encryptionMiddleware)
router.use("/users", userController);

export default router;