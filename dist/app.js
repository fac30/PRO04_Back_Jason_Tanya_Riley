"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handles Express app setup (middleware, routes, etc.) but doesn’t start the server.
 */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./models/dbInit"); // Assuming this file just runs the schema.sql to create tables
require("./models/seed");
const app = (0, express_1.default)();
// Enable All CORS Requests
app.use((0, cors_1.default)());
// Define routes
app.get('/', (req, res) => {
    res.send('Successful response.');
});
exports.default = app;
