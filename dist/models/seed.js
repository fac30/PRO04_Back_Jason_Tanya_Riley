"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const seedData = fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), 'db/seed.sql'), 'utf-8');
// Execute the SQL schema to seed tables
db_1.default.exec(seedData, (err) => {
    if (err) {
        console.error('Error seeding database:', err.message);
    }
    else {
        console.log('Database seeded successfully.');
    }
});
exports.default = db_1.default;
