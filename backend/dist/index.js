"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./db/config");
const notFound_1 = require("./middleware/notFound");
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
const user_route_1 = require("./modules/user/user.route");
const loan_route_1 = require("./modules/loan/loan.route");
const ledger_route_1 = require("./modules/ledger/ledger.route");
const customer_route_1 = require("./modules/customer/customer.route");
const activity_route_1 = require("./modules/activity/activity.route");
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
// Test routes
app.get("/", (req, res) => {
    res.send("Hola mundo");
});
// user routes
app.use("/api/v1/user", user_route_1.userRoutes);
// Loan routes
app.use("/api/v1/loan", loan_route_1.loanRoutes);
// Ledger routes
app.use("/api/v1/ledger", ledger_route_1.ledgerRoutes);
// customer routes
app.use("/api/v1/customer", customer_route_1.customerRouter);
// activity routes
app.use("/api/v1/activity", activity_route_1.activityRoutes);
// Not found route
app.use("*", notFound_1.notFound);
// Global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
// Start app
app.listen(port, () => {
    (0, config_1.dbConnection)();
    console.log(`Server is running on port ${port}`);
});
