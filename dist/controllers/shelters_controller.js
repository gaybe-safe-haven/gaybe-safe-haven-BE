"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shelterController = void 0;
const express_1 = __importDefault(require("express"));
const prisma_config_1 = __importDefault(require("../db/prisma.config"));
const shelter_1 = require("../serializers/shelter");
exports.shelterController = express_1.default.Router();
exports.shelterController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shelterData = req.body;
        const shelter = yield prisma_config_1.default.shelter.create({ data: shelterData });
        res.status(201).send({
            data: (0, shelter_1.serializeShelter)(shelter)
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.shelterController.get('/:shelterId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.shelterId, 10);
    const shelter = yield prisma_config_1.default.shelter.findUnique({
        where: {
            id: id
        }
    });
    res.status(200).send({ data: (0, shelter_1.serializeShelter)(shelter) });
}));
//# sourceMappingURL=shelters_controller.js.map