import axios from "axios";
import { printData } from "../helpers/string";
import { logger } from "./logger";
import { config } from "../config/config";

export const clowd9BaseUrl = config?.clowd9?.baseUrl;

export const generateAuthToken = async (): Promise<string> => {
    try {
        const apiBody = {
            key: config?.clowd9?.apiKey,
            secret: config?.clowd9?.apiSecret,
        };

        const apiOptions = {
            method: "POST",
            url: `${clowd9BaseUrl}/auth`,
            headers: {
                "Content-Type": "application/json",
            },
            data: apiBody,
        };

        logger.info(`API options: ${printData(apiOptions)}`);

        const response = await axios.request(apiOptions);

        logger.info(`Token response: ${printData(response?.data)}`);

        return response?.data?.access_token;
    } catch (error: any) {
        logger.error("Token Creation is failing", error);

        throw error
    }
};


export const commonHeaders = async () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${await generateAuthToken()}`
});