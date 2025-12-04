import { NextFunction, Request, Response, Router } from "express";
import { getOkResponse, sendApiResponse } from "../../utils/apiResponse";
import { 
  getTransactionsList, 
  getTransactionById, 
  createDeposit, 
  createWithdrawal, 
  createTransfer 
} from "../../services/transactions/transactionsService";

const transactionsController: Router = Router();

// Get Transactions List
transactionsController.post("/", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await getTransactionsList(req.body);
    return getOkResponse(result);
  });
});

// Get Transaction by ID
transactionsController.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await getTransactionById(req.params.id);
    return getOkResponse(result);
  });
});

// Create Deposit Transaction
transactionsController.post("/deposits/new", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await createDeposit(req.body);
    return getOkResponse(result);
  });
});

// Create Withdrawal Transaction
transactionsController.post("/withdrawals/new", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await createWithdrawal(req.body);
    return getOkResponse(result);
  });
});

// Create Transfer
transactionsController.post("/transfer/new", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await createTransfer(req.body);
    return getOkResponse(result);
  });
});

export default transactionsController;