import mongoose from "mongoose";

export const dbConnection = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_URL as string);
		console.log("Database connected to host: ", conn.connection.host);
	} catch (err) {
		console.log("Connection failed, Error: ", err);
		process.exit(1);
	}
};
