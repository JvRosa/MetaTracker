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
const categoriaController = __importStar(require("../controllers/categoriaController"));
const categoriaRouter = express_1.default.Router();
categoriaRouter.use('/categorias', authController_1.verifyToken);
categoriaRouter.use('/categorias/:categoriaId', authController_1.verifyToken);
// Rota para criar uma nova categoria
categoriaRouter.post('/categorias', categoriaController.criarCategoria);
// Rota para listar as categorias de um usuario com o token
categoriaRouter.get('/categorias', categoriaController.listarCategorias);
// Rota para atualizar a categoria
categoriaRouter.put('/categorias/:categoriaId', categoriaController.atualizarCategoria);
// Rota para excluir uma categoria
categoriaRouter.delete('/categorias/:categoriaId', categoriaController.excluirCategoria);
exports.default = categoriaRouter;
