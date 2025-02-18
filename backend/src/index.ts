import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./db/config";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { userRoutes } from "./modules/user/user.route";
import { loanRoutes } from "./modules/loan/loan.route";
import { ledgerRoutes } from "./modules/ledger/ledger.route";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

// Test routes
app.get("/", (req, res) => {
	res.send("Hola mundo");
});

// user routes
app.use("/api/v1/user", userRoutes)

// Loan routes
app.use("/api/v1/loan", loanRoutes)

// Ledger routes
app.use("/api/v1/ledger", ledgerRoutes)

// Not found route
app.use("*", notFound);

// Global error handler
app.use(globalErrorHandler);

// Start app
app.listen(port, () => {
	dbConnection();
	console.log(`Server is running on port ${port}`);
});
