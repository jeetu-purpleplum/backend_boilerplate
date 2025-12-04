import axios from "axios";
import { logger } from "../../utils/logger";
import createHttpError from "http-errors";
import { fxboApiVersion, fxboBaseUrl, getFxboHeaders } from "../../utils/fxboUtils";





// UTILITY for FXBO API call templates
const callFxboAPI = async (method: string, url: string, data?: any, params?: any) => {
  try {
    console.log("=========fxboApiVersion",fxboApiVersion)
    const fullUrl = `${url}${url.includes('?') ? '&' : '?'}version=${fxboApiVersion}`;
    logger.info(`${method} ${fullUrl} Request: ${JSON.stringify(data || {})}`);

    const response = await axios.request({
      method,
      url: fullUrl,
      headers: await getFxboHeaders(),
      data,
      params
    });

    logger.info(`${method} ${fullUrl} Response: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error: any) {
    const apiError = error.response?.data;
    const err = new createHttpError.BadGateway(
      apiError?.message || "Error from FXBO API"
    );

    (err as any).data = apiError;
    logger.error(`${method} ${url} Error:`, { error: apiError });
    throw err;
  }
};

// Get Transactions List
export const getTransactionsListAPI = (payload: any) =>
  callFxboAPI("POST", `${fxboBaseUrl}/transactions`, payload);

// Get Transaction by ID
export const getTransactionByIdAPI = (id: string) =>
  callFxboAPI("GET", `${fxboBaseUrl}/transactions/${id}`);

// Create Deposit Transaction
export const createDepositAPI = (payload: any) =>
  callFxboAPI("POST", `${fxboBaseUrl}/transactions/deposits/new`, payload);

// Create Withdrawal Transaction
export const createWithdrawalAPI = (payload: any) =>
  callFxboAPI("POST", `${fxboBaseUrl}/transactions/withdrawals/new`, payload);

// Create Transfer
export const createTransferAPI = (payload: any) =>
  callFxboAPI("POST", `${fxboBaseUrl}/transfer/new`, payload);