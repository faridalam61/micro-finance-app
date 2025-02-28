import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TCustomer } from "./customer.interface";
import { Customer } from "./customer.model";

// Create customer
const createCustomerIntoDB = async (
	photoFile: any,
	nidFile: any,
	payload: TCustomer
) => {
	const photoName = `photo-${Date.now()}`;
	const nidName = `nid-${Date.now()}`;

	// Upload images to Cloudinary
	const { secure_url: photoUrl } = await sendImageToCloudinary(
		photoName,
		photoFile?.path
	);
	const { secure_url: nidUrl } = await sendImageToCloudinary(
		nidName,
		nidFile?.path
	);

	// Assign URLs to payload
	payload.photo = photoUrl;
	payload.nidPhoto = nidUrl;

	// Save to database
	const result = await Customer.create(payload);
	return result;
};

// get all customer
const getAllCustomerFromDB = async () => {
	const result = await Customer.find();
	return result;
};

// get customer by id
const getCustomerByIDFromDB = async (id: string) => {
	const result = await Customer.findById(id);
	return result;
};

// update customer
const updateCustomerIntoDB = async (
	id: string,
	payload: Partial<TCustomer>
) => {
	const result = await Customer.findByIdAndUpdate(id, payload, { new: true });
	return result;
};

// delete customer
const deleteCustomerFromDB = async (id: string) => {
	const result = await Customer.findByIdAndDelete(id);
	return result;
};

export const customerServices = {
	createCustomerIntoDB,
	getAllCustomerFromDB,
	getCustomerByIDFromDB,
	updateCustomerIntoDB,
	deleteCustomerFromDB,
};
