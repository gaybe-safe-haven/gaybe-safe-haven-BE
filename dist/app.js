"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const shelters_controller_1 = require("./controllers/shelters_controller");
//Configure Global Middlware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// shelter endpoint
app.use('/api/v1/shelters', shelters_controller_1.shelterController);
exports.default = app;
//# sourceMappingURL=app.js.map