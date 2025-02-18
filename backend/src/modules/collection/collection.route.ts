import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { collectionValidationSchema } from "./collection.validation";
import { collectionController } from "./collection.controller";

const router = express.Router();

router.post(
	"/",
	validateRequest(collectionValidationSchema.createCollectionValidation),
	collectionController.createCollection
);

router.delete("/:id", collectionController.deleteCollection);

export const collectionRoutes = router;
