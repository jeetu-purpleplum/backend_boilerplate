import { logger } from "../../utils/logger";
import { createBulkAddressAPI, createCardAPI, deleteBulkAddressAPI, getBulkAddressByIdAPI, getCardByIdAPI, getCardUsageAPI, getSecureCardDetailsAPI, onboardCardAPI, queryCardByPanAPI, renewCardAPI, replaceCardAPI, setSecurePinAPI, updateBulkAddressAPI, updateCardDeliveryAPI, updateCardStatusAPI, updateCardUsageAPI, upgradeCardAPI } from "./cardsServiceHelper";




// Create Card
export const createCard = async (payload: any) => {
    try {
        return await createCardAPI(payload);
    } catch (error: any) {
        logger.error("Error in createCard service", { error });
        throw error;
    }
};

// Create Card and Customer Using Onboard 
export const onboardCard = async (payload: any) => {
    try {
        return await onboardCardAPI(payload);
    } catch (error: any) {
        logger.error("Error in onboardCard service", { error });
        throw error;
    }
};

// Update Card Status
export const updateCardStatus = async (card_id: string, payload: any) => {
    try { return await updateCardStatusAPI(card_id, payload); }
    catch (error: any) {
        logger.error("Error in updateCardStatus service", { error });
        throw error;
    }
};


// Query Card by PAN
export const queryCardByPan = async (payload: any) => {
    try { return await queryCardByPanAPI(payload); }
    catch (error: any) {
        logger.error("Error in queryCardByPan service", { error });
        throw error;
    }
};


// Get Card by ID
export const getCardById = async (card_id: string) => {
    try { return await getCardByIdAPI(card_id); }
    catch (error: any) {
        logger.error("Error in getCardById service", { error });
        throw error;
    }
};


// Update Delivery
export const updateCardDelivery = async (card_id: string, payload: any) => {
    try { return await updateCardDeliveryAPI(card_id, payload); }
    catch (error: any) {
        logger.error("Error in updateCardDelivery service", { error });
        throw error;
    }
};


// Replace Card
export const replaceCard = async (card_id: string, payload: any) => {
    try { return await replaceCardAPI(card_id, payload); }
    catch (error: any) {
        logger.error("Error in replaceCard service", { error });
        throw error;
    }
};


// Renew Card
export const renewCard = async (card_id: string, payload: any) => {
    try { return await renewCardAPI(card_id, payload); }
    catch (error: any) {
        logger.error("Error in renewCard service", { error });
        throw error;
    }
};


// Secure Card Details
export const getSecureCardDetails = async (card_id: string) => {
    try { return await getSecureCardDetailsAPI(card_id); }
    catch (error: any) {
        logger.error("Error in getSecureCardDetails service", { error });
        throw error;
    }
};


// Get Card Usage
export const getCardUsage = async (card_id: string) => {
    try { return await getCardUsageAPI(card_id); }
    catch (error: any) {
        logger.error("Error in getCardUsage service", { error });
        throw error;
    }
};


// Update Card Usage
export const updateCardUsage = async (card_id: string, payload: any) => {
    try { return await updateCardUsageAPI(card_id, payload); }
    catch (error: any) {
        logger.error("Error in updateCardUsage service", { error });
        throw error;
    }
};


// Upgrade Card
export const upgradeCard = async (card_id: string, payload: any) => {
    try { return await upgradeCardAPI(card_id, payload); }
    catch (error: any) {
        logger.error("Error in upgradeCard service", { error });
        throw error;
    }
};

// Bulk Address - Create
export const createBulkAddress = async (card_file_schedule_id: string, payload: any) => {
    try { return await createBulkAddressAPI(card_file_schedule_id, payload); }
    catch (error: any) {
        logger.error("Error in createBulkAddress service", { error });
        throw error;
    }
};


// Bulk Address - Get By ID
export const getBulkAddressById = async (card_file_schedule_id: string, bulk_address_id: string) => {
    try { return await getBulkAddressByIdAPI(card_file_schedule_id, bulk_address_id); }
    catch (error: any) {
        logger.error("Error in getBulkAddressById service", { error });
        throw error;
    }
};


// Bulk Address - Update
export const updateBulkAddress = async (
    card_file_schedule_id: string,
    bulk_address_id: string,
    payload: any
) => {
    try { return await updateBulkAddressAPI(card_file_schedule_id, bulk_address_id, payload); }
    catch (error: any) {
        logger.error("Error in updateBulkAddress service", { error });
        throw error;
    }
};


// Bulk Address - Delete
export const deleteBulkAddress = async (card_file_schedule_id: string, bulk_address_id: string) => {
    try { return await deleteBulkAddressAPI(card_file_schedule_id, bulk_address_id); }
    catch (error: any) {
        logger.error("Error in deleteBulkAddress service", { error });
        throw error;
    }
};


// Set Secure PIN
export const setSecurePin = async (card_id: string, payload: any) => {
    try { return await setSecurePinAPI(card_id, payload); }
    catch (error: any) {
        logger.error("Error in setSecurePin service", { error });
        throw error;
    }
};