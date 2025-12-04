import axios from "axios";
import { logger } from "../../utils/logger";
import createHttpError from "http-errors";
import { clowd9BaseUrl, commonHeaders } from "../../utils/clowd9Utils";


// Create Customer
export const createCustomerAPI = async (payload: any) => {
    try {
        logger.info(`Create Customer Request: ${JSON.stringify(payload)}`);

        const apiOptions = {
            method: "POST",
            url: `${clowd9BaseUrl}/customers`,
            headers: await commonHeaders(),
            data: payload
        }

        const response = await axios.request(apiOptions);
        logger.info(`Create Customer Response: ${JSON.stringify(response.data)}`);

        return response.data;
    } catch (error: any) {
        logger.error(`Error creating customer: ${error.response?.data || error.message}`);

        const apiError = error.response?.data;
        const err = new createHttpError.BadGateway(
            apiError?.message || "Failed to create customer"
        );

        (err as any).data = apiError;
        throw err;
    }
};


// Get Customer List
export const getCustomerListAPI = async (
    client_id: string,
    sort?: string,
    limit?: string,
    next_page_token?: string
) => {
    try {
        const apiOptions = {
            method: "GET",
            url: `${clowd9BaseUrl}/customers`,
            headers: await commonHeaders(),
            params: {
                client_id,
                sort,
                limit,
                next_page_token
            }
        };

        const response = await axios.request(apiOptions);

        return response.data;
    } catch (error: any) {
        logger.error(`Error fetching customer list: ${error.response?.data || error.message}`);
        throw new createHttpError.BadGateway(error);
    }
};

// Get Customer by External Reference
export const getCustomerByExternalRefAPI = async (ref: string, client_id: string) => {
    try {

        const apiOptions = {
            method: "GET",
            url: `${clowd9BaseUrl}/customers/ref/${ref}`,
            headers: await commonHeaders(),
            params: {
                client_id
            }
        };

        const response = await axios.request(apiOptions);

        return response.data;
    } catch (error: any) {
        console.log(error);
        
        logger.error(`Error fetching customer by external_ref: ${error.response?.data || error.message}`);
        throw new createHttpError.BadGateway(error);
    }
};


// Get Customer by ID
export const getCustomerByIdAPI = async (customerId: string) => {
    try {
        const apiOptions = {
            method: "GET",
            url: `${clowd9BaseUrl}/customers/${customerId}`,
            headers: await commonHeaders()
        };

        const response = await axios.request(apiOptions);

        return response.data;
    } catch (error: any) {
        logger.error(`Error fetching customer by ID: ${error.response?.data || error.message}`);
        throw new createHttpError.BadGateway(error);
    }
};


// Update Customer
export const updateCustomerAPI = async (customerId: string, payload: any) => {
    try {
        const apiOptions = {
            method: "POST",
            url: `${clowd9BaseUrl}/customers/${customerId}`,
            headers: await commonHeaders(),
            data: payload
        };

        const response = await axios.request(apiOptions);

        return response.data;
    } catch (error: any) {
        logger.error(`Error updating customer: ${error.response?.data || error.message}`);
        throw new createHttpError.BadGateway(error);
    }
};


// Get Customer Secure Key
export const getCustomerSecureKeyAPI = async (customerId: string) => {
    try {
        const apiOptions = {
            method: "GET",
            url: `${clowd9BaseUrl}/customers/${customerId}/secure-key`,
            headers: await commonHeaders()
        };

        const response = await axios.request(apiOptions);

        return response.data;
    } catch (error: any) {
        console.log(error)
        logger.error(`Error fetching customer secure key: ${error.response?.data || error.message}`);
        throw new createHttpError.BadGateway(error);
    }
};

// Get Cards by Customer
export const getCardsByCustomerIdAPI = async (customerId: string) => {
    try {
        const apiOptions = {
            method: "GET",
            url: `${clowd9BaseUrl}/customers/${customerId}/cards`,
            headers: await commonHeaders()
        };

        const response = await axios.request(apiOptions);

        return response.data;
    } catch (error: any) {
        logger.error(`Error fetching cards by customerId: ${error.response?.data || error.message}`);
        throw new createHttpError.BadGateway(error);
    }
};