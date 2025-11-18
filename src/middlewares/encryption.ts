import crypto from "crypto";
import { config } from "../config/config";
import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import { getErrorResponse } from "../utils/apiResponse";
import { ParsedQs } from "qs";

const encryptionSecretKey = config.encryption.responseEncryptionKey;
const algorithm = "aes-256-gcm";

if (!encryptionSecretKey) {
    throw new Error("RESPONSE_ENCRYPTION_KEY is not found");
}

export const generateRandomBytes = (size: number): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(size, (err, buf) => {
            if (err) {
                return reject(err);
            }
            resolve(buf);
        });
    });
};

/**
 * Encrypts given text asynchronously.
 *
 * @param {any} text - Text to be encrypted, can be a string or an object (will be converted to string).
 * @returns {Promise<string>} - A promise with a string containing the encrypted text as well as the initialization vector.
 * @throws {Error} - If the encryption key was not found in the environment variables.
 */
export async function encryptAsync(text: any): Promise<string> {
    const iv = await generateRandomBytes(12);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionSecretKey), iv);

    if (typeof text === "object" && text !== null) {
        text = JSON.stringify(text);
    }

    // this will make sure that value is always string
    if (typeof text !== "string") {
        text = String(text);
    }

    let encrypted = cipher.update(text, "utf-8");
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const authTag = cipher.getAuthTag();

    return `${iv.toString("hex")}:${encrypted.toString("hex")}:${authTag.toString("hex")}`;
}

/**
 * Asynchronous decryption
 * @param {string} text the encrypted text
 * @returns {Promise<string>} the decrypted text
 * @throws {Error} Invalid encryption data format
 * @throws {Error} Invalid encryption data: Initialization vector or encrypted text is missing
 * @throws {Error} JSON parse error when trying to parse the decrypted text
 */
export async function decryptAsync(text: string): Promise<string> {
    if (typeof text !== "string") {
        throw new Error("Invalid input: text must be a string");
    }

    const textParts = text?.split(":");
    if (textParts.length !== 3) {
        throw new Error("Invalid encryption data format");
    }

    if (!textParts[0] || !textParts[1] || !textParts[2]) {
        throw new Error(
            "Invalid encryption data: Initialization vector or encrypted text or auth tag is missing"
        );
    }

    const iv = Buffer.from(textParts[0], "hex");

    const encryptedText = Buffer.from(textParts[1], "hex");

    const authTag = Buffer.from(textParts[2], "hex");

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionSecretKey), iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    let decryptedText = decrypted.toString("utf8"); // Convert the final buffer to a string

    try {
        const parsedValue = JSON.parse(decryptedText);

        if (typeof parsedValue === "object" && parsedValue !== null) {
            decryptedText = parsedValue;
        }
        return decryptedText;
    } catch (e) {
        // The value is not JSON or decryption failed, no need to modify
        console.log(e);
        return decryptedText;
    }
}

/**
 * Encrypts the response data based on the value of the "X-Api-Encrypt" header.
 * If the header is not present or is set to "false", the response is sent as is.
 * If the header is set to "true", the response is encrypted using the
 * `encryptAsync` function.
 *
 * If the response contains an error (i.e., `apiResponse.error` is true), the
 * response is sent directly without encryption.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 */
export const encryptionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { apiResponse } = res.locals;

        logger.info("in encryption service");

        // Skip encryption if there is no apiResponse data
        if (!apiResponse) {
            return next();
        }

        const shouldEncrypt = req.headers["x-api-encrypt"]?.toString().toLowerCase() !== "false"; // Normalize and check header

        // If there's an error in apiResponse, send it directly without further processing
        if (apiResponse.error) {
            return res.status(apiResponse.status).send(apiResponse);
        }

        // Encrypt the data only if needed
        if (shouldEncrypt) {
            logger.info("Encrypting Body Data");
            apiResponse.data = await encryptAsync(apiResponse.data); // Encrypt and replace data
        } else {
            logger.info("Not Encrypting Body Data");
        }

        // Send the response after encryption check
        res.status(apiResponse.status).send(apiResponse);
    } catch (error: any) {
        logger.error("Error in encryption middleware:", error);
        const errResponse = getErrorResponse(error);
        res.status(errResponse.status).send(errResponse);
    }
};

/**
 * Decrypts the request body data asynchronously if the `X-API-ENCRYPT` header
 * is set to "true".
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 *
 * @throws {Error} - If there is an error during decryption
 */
export const decryptionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info(`Decrypting Body Data`);
        const shouldDecrypt = req.headers["x-api-encrypt"]?.toString().toLowerCase() !== "false"; // Normalize and check header

        const decryptParams = req.query?.data ? true : false;
        const decryptBody = req.body?.data ? true : false;

        req.body = req.body || {};

        // Skip decryption if there's no data or decryption is not needed
        if (!shouldDecrypt) {
            logger.info(`Ignoring Decryption`);
            return next();
        }

        if (shouldDecrypt && !req.body?.data && !decryptParams) {
            return next();
        }

        if (decryptBody) {
            // Decrypt the request data and replace body content
            req.body = await decryptAsync(req.body.data);
        }

        // Decrypt the query params
        if (decryptParams) {
            const decryptedParams = (await decryptAsync(
                req.query?.data as string
            )) as unknown as ParsedQs;

            Object.defineProperty(req, "query", {
                value: decryptedParams,
                writable: false,
                enumerable: true,
                configurable: true,
            });
        }
        next();
    } catch (error: any) {
        logger.error("Error in decryption middleware:", error);
        const errResponse = getErrorResponse(error);
        res.status(errResponse.status).send(errResponse);
    }
};
