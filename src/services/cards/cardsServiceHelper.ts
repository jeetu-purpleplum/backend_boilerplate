import axios from "axios";
import { clowd9BaseUrl, commonHeaders } from "../../utils/clowd9Utils";
import { logger } from "../../utils/logger";
import createHttpError from "http-errors";


// // Create Card
// export const createCardAPI = async (payload: any) => {
//     try {
//         logger.info(`Create Card Request: ${JSON.stringify(payload)}`);

//         const apiOptions = {
//             method: "POST",
//             url: `${clowd9BaseUrl}/cards`,
//             headers: await commonHeaders(),
//             data: payload
//         }

//         const response = await axios.request(apiOptions);
//         logger.info(`Create Card Response: ${JSON.stringify(response.data)}`);

//         return response.data;
//     } catch (error: any) {
//         logger.error(`Error creating card: ${error.response?.data || error.message}`);
//         throw new createHttpError.BadGateway(error);
//     }
// };


// // Onboard Card
// export const onboardCardAPI = async (payload: any) => {
//     try {
//         logger.info(`Onboard Card Request: ${JSON.stringify(payload)}`);

//         const apiOptions = {
//             method: "POST",
//             url: `${clowd9BaseUrl}/onboard`,
//             headers: await commonHeaders(),
//             data: payload
//         }

//         const response = await axios.request(apiOptions);
//         logger.info(`Onboard Card Response: ${JSON.stringify(response.data)}`);

//         return response.data;
//     } catch (error: any) {
//         logger.error(`Error in onboard card: ${error.response?.data || error.message}`);
//         throw new createHttpError.BadGateway(error);
//     }
// };



// UTILITY for API call templates
const callClowd9API = async (method: string, url: string, data?: any) => {
    try {
        logger.info(`${method} ${url} Request: ${JSON.stringify(data || {})}`);

        const response = await axios.request({
            method,
            url,
            headers: await commonHeaders(),
            data
        });

        logger.info(`${method} ${url} Response: ${JSON.stringify(response.data)}`);
        return response.data;
    } catch (error: any) {
        const apiError = error.response?.data;
        const err = new createHttpError.BadGateway(
            apiError?.message || "Error from clowd9"
        );

        (err as any).data = apiError;
        throw err;
    }
};


// Create Card
export const createCardAPI = (payload: any) =>
    callClowd9API("POST", `${clowd9BaseUrl}/cards`, payload);


// Onboard Card
export const onboardCardAPI = (payload: any) => 
    callClowd9API("POST", `${clowd9BaseUrl}/cards/onboard`, payload);


// Update Card Status
export const updateCardStatusAPI = (card_id: string, payload: any) =>
    callClowd9API("POST", `${clowd9BaseUrl}/cards/${card_id}/status`, payload);


// Query Card by PAN
export const queryCardByPanAPI = (payload: any) =>
    callClowd9API("POST", `${clowd9BaseUrl}/cards/query-by-pan`, payload);


// Get Card by ID
export const getCardByIdAPI = (card_id: string) =>
    callClowd9API("GET", `${clowd9BaseUrl}/cards/${card_id}`);


// Update Delivery
export const updateCardDeliveryAPI = (card_id: string, payload: any) =>
    callClowd9API("PATCH", `${clowd9BaseUrl}/cards/${card_id}/delivery`, payload);


// Replace Card
export const replaceCardAPI = (card_id: string, payload: any) =>
    callClowd9API("POST", `${clowd9BaseUrl}/cards/${card_id}/replace`, payload);


// Renew Card
export const renewCardAPI = (card_id: string, payload: any) =>
    callClowd9API("POST", `${clowd9BaseUrl}/cards/${card_id}/renew`, payload);


// Secure Card Details
export const getSecureCardDetailsAPI = (card_id: string) =>
    callClowd9API("POST", `${clowd9BaseUrl}/cards/${card_id}/secure-details`);


// Get Card Usage
export const getCardUsageAPI = (card_id: string) =>
    callClowd9API("GET", `${clowd9BaseUrl}/cards/${card_id}/usage`);


// Update Card Usage
export const updateCardUsageAPI = (card_id: string, payload: any) =>
    callClowd9API("POST", `${clowd9BaseUrl}/cards/${card_id}/usage`, payload);


// Upgrade Card
export const upgradeCardAPI = (card_id: string, payload: any) =>
    callClowd9API("POST", `${clowd9BaseUrl}/cards/${card_id}/upgrade`, payload);

// Bulk Address - Create
export const createBulkAddressAPI = (card_file_schedule_id: string, payload: any) =>
    callClowd9API(
        "POST",
        `${clowd9BaseUrl}/schedule/${card_file_schedule_id}/bulk-address`,
        payload
    );


// Bulk Address - Get by ID
export const getBulkAddressByIdAPI = (card_file_schedule_id: string, bulk_address_id: string) =>
    callClowd9API(
        "GET",
        `${clowd9BaseUrl}/schedule/${card_file_schedule_id}/bulk-address/${bulk_address_id}`
    );


// Bulk Address - Update
export const updateBulkAddressAPI = (
    card_file_schedule_id: string,
    bulk_address_id: string,
    payload: any
) =>
    callClowd9API(
        "POST",
        `${clowd9BaseUrl}/schedule/${card_file_schedule_id}/bulk-address/${bulk_address_id}`,
        payload
    );


// Bulk Address - Delete
export const deleteBulkAddressAPI = (card_file_schedule_id: string, bulk_address_id: string) =>
    callClowd9API(
        "DELETE",
        `${clowd9BaseUrl}/schedule/${card_file_schedule_id}/bulk-address/${bulk_address_id}`
    );


// Set Secure PIN
export const setSecurePinAPI = (card_id: string, payload: any) =>
    callClowd9API("POST", `${clowd9BaseUrl}/cards/${card_id}/set-secure-pin`, payload);
