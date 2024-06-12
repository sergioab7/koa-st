"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fileExists = dotenv_1.default.config();
if (!fileExists) {
    throw new Error("[-] Error. File .env doesn't exists");
}
exports.default = {
    PORT: process.env.PORT || 3002
};
