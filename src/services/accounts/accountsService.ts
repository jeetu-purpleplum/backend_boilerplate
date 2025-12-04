import { logger } from "../../utils/logger";
import { 
  getAccountBalanceAPI, 
  checkBalanceAPI 
} from "./accountsServiceHelper";

// Get Account Balance by loginSid
export const getAccountBalance = async (loginSid: string) => {
  try {
    return await getAccountBalanceAPI(loginSid);
  } catch (error: any) {
    logger.error("Error in getAccountBalance service", { error });
    throw error;
  }
};

// Check Balance Action
export const checkBalance = async (payload: any) => {
  try {
    return await checkBalanceAPI(payload);
  } catch (error: any) {
    logger.error("Error in checkBalance service", { error });
    throw error;
  }
};