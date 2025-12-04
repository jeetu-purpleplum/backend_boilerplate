import { NextFunction, Request, Response, Router } from "express";
import { getOkResponse, sendApiResponse } from "../../utils/apiResponse";
import { createCustomer, getCardsByCustomerId, getCustomerByExternalRef, getCustomerById, getCustomerList, getCustomerSecureKey, updateCustomerById } from "../../services/customers/customersService";

const customerController: Router = Router();

// Create Customer
customerController.post('/', (req: Request, res: Response, next: NextFunction) => {
    sendApiResponse(req, res, next, async () => {
        const result = await createCustomer(req.body);
        return getOkResponse(result);
    }); 
})  

// Get Customer List
customerController.get('/', (req: Request, res: Response, next: NextFunction) => {
    sendApiResponse(req, res, next, async () => {
        const { client_id, sort, limit, next_page_token } = req.query;
        const result = await getCustomerList(
            client_id as string,
            sort as string,
            limit as string,
            next_page_token as string
        );
        return getOkResponse(result);
    });
})

// Retrieves Customer details using the External Reference
customerController.get('/ref/:external_ref', (req: Request, res: Response, next: NextFunction) => {
    sendApiResponse(req, res, next, async () => {
        const { external_ref } = req.params;
        const { client_id } = req.query
        const result = await getCustomerByExternalRef(external_ref, client_id as string);
        return getOkResponse(result);
    });
})

// Get Single Customer Details By Id
customerController.get('/:customer_id', (req: Request, res: Response, next: NextFunction) => {
    sendApiResponse(req, res, next, async () => {
        const { customer_id } = req.params;
        const result = await getCustomerById(customer_id);
        return getOkResponse(result);
    });
})

// Update Customer Details by Id
customerController.post('/:customer_id', (req: Request, res: Response, next: NextFunction) => {
    sendApiResponse(req, res, next, async () => {
        const { customer_id } = req.params;
        const result = await updateCustomerById(customer_id, req.body);
        return getOkResponse(result);
    });
})

// Get Customer Key
customerController.get('/:customer_id/secure-key', (req: Request, res: Response, next: NextFunction) => {
    sendApiResponse(req, res, next, async () => {
        const { customer_id } = req.params;
        const result = await getCustomerSecureKey(customer_id);
        return getOkResponse(result);
    });
})

// Get Cards by CustomerId
customerController.get('/:customer_id/cards', (req: Request, res: Response, next: NextFunction) => {
    sendApiResponse(req, res, next, async () => {
        const { customer_id } = req.params;
        const result = await getCardsByCustomerId(customer_id);
        return getOkResponse(result);
    });
})

export default customerController;