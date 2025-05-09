import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./db/config";
import { notFound } from "./middleware/notFound";
import { userRoutes } from "./modules/user/user.route";
import { loanRoutes } from "./modules/loan/loan.route";
import { ledgerRoutes } from "./modules/ledger/ledger.route";
import { customerRouter } from "./modules/customer/customer.route";
import { activityRoutes } from "./modules/activity/activity.route";
import { authRoutes } from "./modules/auth/auth.route";
import { collectionRoutes } from "./modules/collection/collection.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";

dotenv.config();
const port = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// Test routes
app.get("/", (req, res) => {
	res.send("Hola mundo");
});

// user routes
app.use("/api/v1/user", userRoutes);

// Loan routes
app.use("/api/v1/loan", loanRoutes);

// Ledger routes
app.use("/api/v1/ledger", ledgerRoutes);

// customer routes
app.use("/api/v1/customer", customerRouter);

// activity routes
app.use("/api/v1/activity", activityRoutes);

// Collection routes
app.use("/api/v1/collection", collectionRoutes);

// auth routes
app.use("/api/v1/auth", authRoutes);

// Not found route
app.use("*", notFound);

// Global error handler
app.use(globalErrorHandler);

// Start app
app.listen(port, () => {
	dbConnection();
	console.log(`Server is running on port ${port}`);
});
