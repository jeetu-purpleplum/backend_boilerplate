import { config } from "../config/config";


export const fxboBaseUrl = config?.fxbo?.baseUrl;
export const fxboAuthToken = config?.fxbo?.token;
export const fxboApiVersion = config?.fxbo?.apiVersion;


// Common headers for FXBO API
export const getFxboHeaders = async () => {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${fxboAuthToken}`
  };
};