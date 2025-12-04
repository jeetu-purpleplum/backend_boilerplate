import { NextFunction, Request, Response, Router } from "express";
import { getOkResponse, sendApiResponse } from "../../utils/apiResponse";
import { 
  getAccountBalance, 
  checkBalance 
} from "../../services/accounts/accountsService";

const accountsController: Router = Router();

// Get Account Balance by loginSid
accountsController.get("/balance/:loginSid", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await getAccountBalance(req.params.loginSid);
    return getOkResponse(result);
  });
});

// Check Balance Action
accountsController.post("/check-balance", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await checkBalance(req.body);
    return getOkResponse(result);
  });
});

export default accountsController;