import axios from "axios";
import { logger } from "../../utils/logger";
import createHttpError from "http-errors";
import { fxboApiVersion, fxboBaseUrl, getFxboHeaders } from "../../utils/fxboUtils";




// UTILITY for FXBO API call templates
const callFxboAPI = async (method: string, url: string, data?: any, params?: any) => {
  try {
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
      apiError?.message || apiError?.error_description || "Error from FXBO API"
    );

    (err as any).data = apiError;
    logger.error(`${method} ${url} Error:`, { error: apiError });
    throw err;
  }
};

// Get Account Balance by loginSid
export const getAccountBalanceAPI = (loginSid: string) =>
  callFxboAPI("GET", `${fxboBaseUrl}/accounts/balance/${loginSid}`);

// Check Balance Action
export const checkBalanceAPI = (payload: any) =>
  callFxboAPI("POST", `${fxboBaseUrl}/accounts/check-balance`, payload);