"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : '';
mongoose_1.default.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//# sourceMappingURL=database.js.map