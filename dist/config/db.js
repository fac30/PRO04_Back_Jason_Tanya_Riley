"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
sqlite3_1.default.verbose();
// Open a persistent database stored in the 'db' directory
const dbPath = path_1.default.resolve(__dirname, '../db/crafts_db.sqlite');
const db = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('Connected to the persistent SQLite database.');
    }
});
exports.default = db;
