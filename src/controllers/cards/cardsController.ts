import { NextFunction, Request, Response, Router } from "express";
import { getOkResponse, sendApiResponse } from "../../utils/apiResponse";
import { createBulkAddress, createCard, deleteBulkAddress, getBulkAddressById, getCardById, getCardUsage, getSecureCardDetails, onboardCard, queryCardByPan, renewCard, replaceCard, setSecurePin, updateBulkAddress, updateCardDelivery, updateCardStatus, updateCardUsage, upgradeCard } from "../../services/cards/cardsService";

const cardsController: Router = Router();


// Create Card
cardsController.post("/", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await createCard(req.body);
    return getOkResponse(result);
  });
});


// Onboard Card
cardsController.post("/onboard", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await onboardCard(req.body);
    return getOkResponse(result);
  });
});


// Update Card Status
cardsController.post("/:card_id/status", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await updateCardStatus(req.params.card_id, req.body);
    return getOkResponse(result);
  });
});


// Query Card by PAN
cardsController.post("/query-by-pan", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await queryCardByPan(req.body);
    return getOkResponse(result);
  });
});


// Get Card by ID
cardsController.get("/:card_id", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await getCardById(req.params.card_id);
    return getOkResponse(result);
  });
});


// Update Delivery Details
cardsController.patch("/:card_id/delivery", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await updateCardDelivery(req.params.card_id, req.body);
    return getOkResponse(result);
  });
});


// Replace Card
cardsController.post("/:card_id/replace", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await replaceCard(req.params.card_id, req.body);
    return getOkResponse(result);
  });
});


// Renew Card
cardsController.post("/:card_id/renew", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await renewCard(req.params.card_id, req.body);
    return getOkResponse(result);
  });
});


// Secure Card Details
cardsController.post("/:card_id/secure-details", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await getSecureCardDetails(req.params.card_id);
    return getOkResponse(result);
  });
});


// Get Card Usage
cardsController.get("/:card_id/usage", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await getCardUsage(req.params.card_id);
    return getOkResponse(result);
  });
});


// Update Card Usage
cardsController.post("/:card_id/usage", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await updateCardUsage(req.params.card_id, req.body);
    return getOkResponse(result);
  });
});


// Upgrade Card
cardsController.post("/:card_id/upgrade", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await upgradeCard(req.params.card_id, req.body);
    return getOkResponse(result);
  });
});

// Bulk Address - Create
cardsController.post(
  "/schedule/:card_file_schedule_id/bulk-address",
  (req: Request, res: Response, next: NextFunction) => {
    sendApiResponse(req, res, next, async () => {
      const result = await createBulkAddress(req.params.card_file_schedule_id, req.body);
      return getOkResponse(result);
    });
  }
);


// Bulk Address - Get Single
cardsController.get(
  "/schedule/:card_file_schedule_id/bulk-address/:bulk_address_id",
  (req: Request, res: Response, next: NextFunction) => {
    sendApiResponse(req, res, next, async () => {
      const result = await getBulkAddressById(
        req.params.card_file_schedule_id,
        req.params.bulk_address_id
      );
      return getOkResponse(result);
    });
  }
);


// Bulk Address - Update
cardsController.post(
  "/schedule/:card_file_schedule_id/bulk-address/:bulk_address_id",
  (req: Request, res: Response, next: NextFunction) => {
    sendApiResponse(req, res, next, async () => {
      const result = await updateBulkAddress(
        req.params.card_file_schedule_id,
        req.params.bulk_address_id,
        req.body
      );
      return getOkResponse(result);
    });
  }
);


// Bulk Address - Delete
cardsController.delete(
  "/schedule/:card_file_schedule_id/bulk-address/:bulk_address_id",
  (req: Request, res: Response, next: NextFunction) => {
    sendApiResponse(req, res, next, async () => {
      const result = await deleteBulkAddress(
        req.params.card_file_schedule_id,
        req.params.bulk_address_id
      );
      return getOkResponse(result);
    });
  }
);


// Set Secure PIN
cardsController.post("/:card_id/set-secure-pin", (req: Request, res: Response, next: NextFunction) => {
  sendApiResponse(req, res, next, async () => {
    const result = await setSecurePin(req.params.card_id, req.body);
    return getOkResponse(result);
  });
});


export default cardsController;
