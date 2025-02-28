import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

export const sendImageToCloudinary = async (name: string, path: string) => {
	// Configuration
	cloudinary.config({
		cloud_name: process.env.CN_CLOUD_NAME,
		api_key: process.env.CN_API_KEY,
		api_secret: process.env.CN_API_SECRET,
	});

	// Upload an image
	const uploadResult = await cloudinary.uploader
		.upload(path, {
			public_id: name,
		})
		.catch((error) => {
			console.log(error);
		});
	return uploadResult;
};

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, process.cwd() + "/uploads/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix);
	},
});

export const upload = multer({
	storage: storage,
}).fields([
	{ name: "photo", maxCount: 1 },
	{ name: "nidPhoto", maxCount: 1 },
]);
