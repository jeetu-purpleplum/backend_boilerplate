import { logger } from "../../utils/logger";
import { createCustomerAPI, getCardsByCustomerIdAPI, getCustomerByExternalRefAPI, getCustomerByIdAPI, getCustomerListAPI, getCustomerSecureKeyAPI, updateCustomerAPI } from "./customersServiceHelper";



// Create Customer
export const createCustomer = async (payload: any) => {
    try {
        return await createCustomerAPI(payload);
    } catch (error: any) {
        logger.error("Error in createCustomer service", { error });
        throw error;
    }
};

// Get Customer List
export const getCustomerList = async (
    client_id: string,
    sort?: string,
    limit?: string,
    next_page_token?: string
) => {
    try {
        return await getCustomerListAPI(
            client_id,
            sort,
            limit,
            next_page_token
        );
    } catch (error: any) {
        logger.error("Error in getCustomerList service", { error });
        throw error;
    }
};

// Get by external reference
export const getCustomerByExternalRef = async (ref: string, client_id: string) => {
    try {
        return await getCustomerByExternalRefAPI(ref, client_id);
    } catch (error: any) {
        logger.error("Error in getCustomerByExternalRef service", { error });
        throw error;
    }
};

// Get by ID
export const getCustomerById = async (customerId: string) => {
    try {
        return await getCustomerByIdAPI(customerId);
    } catch (error: any) {
        logger.error("Error in getCustomerById service", { error });
        throw error;
    }
};

// Update customer by ID
export const updateCustomerById = async (customerId: string, payload: any) => {
    try {
        return await updateCustomerAPI(customerId, payload);
    } catch (error: any) {
        logger.error("Error in updateCustomerById service", { error });
        throw error;
    }
};

// Get Customer Secure Key
export const getCustomerSecureKey = async (customerId: string) => {
    try {
        return await getCustomerSecureKeyAPI(customerId);
    } catch (error: any) {
        logger.error("Error in getCustomerSecureKey service", { error });
        throw error;
    }
};

// Get Cards by customerId
export const getCardsByCustomerId = async (customerId: string) => {
    try {
        return await getCardsByCustomerIdAPI(customerId);
    } catch (error: any) {
        logger.error("Error in getCardsByCustomerId service", { error });
        throw error;
    }
};