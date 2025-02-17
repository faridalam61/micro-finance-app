import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./db/config";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
	res.send("Hola mundo");
});

// Not found route
app.use("*", notFound);

// Global error handler
app.use(globalErrorHandler);

// Start app
app.listen(port, () => {
	dbConnection();
	console.log(`Server is running on port ${port}`);
});
