"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const schema = fs_1.default.readFileSync(path_1.default.join(__dirname, 'schema.sql'), 'utf-8');
// Execute the SQL schema to create tables and indexes
db_1.default.exec(schema, (err) => {
    if (err) {
        console.error('Error creating tables:', err.message);
    }
    else {
        console.log('Tables created successfully or already exist.');
    }
});
exports.default = db_1.default;
