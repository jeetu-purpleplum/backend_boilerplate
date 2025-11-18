// Module Imports
import { Router, Request, Response, NextFunction } from "express";
// File Imports
import { generateRandom } from "../services/healthCheckService";
import { sendApiResponse, getOkResponse } from "../utils/apiResponse";


const healthRoutes: Router = Router();

healthRoutes.get("/randomNumber", (req: Request, res: Response, next: NextFunction) => {
    sendApiResponse(req, res, next, async () => {
        const result = await generateRandom(0, 999999);
        return getOkResponse(result);
    });
});