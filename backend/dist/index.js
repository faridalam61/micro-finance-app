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
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hola mundo");
});
// Not found route
app.use("*", notFound_1.notFound);
// Global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
// Start app
app.listen(port, () => {
    (0, config_1.dbConnection)();
    console.log(`Server is running on port ${port}`);
});
