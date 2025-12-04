import { logger } from "../../utils/logger";
import { 
  getTransactionsListAPI, 
  getTransactionByIdAPI, 
  createDepositAPI, 
  createWithdrawalAPI, 
  createTransferAPI 
} from "./transactionsServiceHelper";

// Get Transactions List
export const getTransactionsList = async (payload: any) => {
  try {
    return await getTransactionsListAPI(payload);
  } catch (error: any) {
    logger.error("Error in getTransactionsList service", { error });
    throw error;
  }
};

// Get Transaction by ID
export const getTransactionById = async (id: string) => {
  try {
    return await getTransactionByIdAPI(id);
  } catch (error: any) {
    logger.error("Error in getTransactionById service", { error });
    throw error;
  }
};

// Create Deposit Transaction
export const createDeposit = async (payload: any) => {
  try {
    return await createDepositAPI(payload);
  } catch (error: any) {
    logger.error("Error in createDeposit service", { error });
    throw error;
  }
};

// Create Withdrawal Transaction
export const createWithdrawal = async (payload: any) => {
  try {
    return await createWithdrawalAPI(payload);
  } catch (error: any) {
    logger.error("Error in createWithdrawal service", { error });
    throw error;
  }
};

// Create Transfer
export const createTransfer = async (payload: any) => {
  try {
    return await createTransferAPI(payload);
  } catch (error: any) {
    logger.error("Error in createTransfer service", { error });
    throw error;
  }
};