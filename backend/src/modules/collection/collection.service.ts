import { TCollection } from "./collection.interface";
import { Collection } from "./collection.model";

const createCollectionIntoDB = async (payload: TCollection) => {
	const result = await Collection.create(payload);

	return result;
};

const deleteCollectionFromDb = async (id: string) => {
	const result = await Collection.findByIdAndDelete(id);

	return result;
};

export const collectionServices = {
	createCollectionIntoDB,
	deleteCollectionFromDb,
};
