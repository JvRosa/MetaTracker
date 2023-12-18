"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const cardController = __importStar(require("../controllers/cardController"));
const cardRouter = express_1.default.Router();
cardRouter.use('/cards', authController_1.verifyToken);
cardRouter.use('/cards/:cardId', authController_1.verifyToken);
cardRouter.use('/cards/:cardId/:newCategoriaId', authController_1.verifyToken);
// Rota para criar uma meta/card
cardRouter.post('/cards', cardController.criarMeta);
// Rota para listar as metas de um usuario com o token
cardRouter.get('/cards', cardController.listarMetas);
// Rota para atualizar a meta/card
cardRouter.put('/cards/:cardId', cardController.atualizarMeta);
// Rota para trocar card de categoria
cardRouter.put('/cards/:cardId/:newCategoriaId', cardController.trocarCategoria);
// Rota para excluir uma meta/card
cardRouter.delete('/cards/:cardId', cardController.excluirMeta);
exports.default = cardRouter;
