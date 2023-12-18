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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirCategoria = exports.atualizarCategoria = exports.listarCategorias = exports.criarCategoria = void 0;
const categoriaService = __importStar(require("../services/categoriaService"));
const criarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, cor } = req.body;
    // Acesse as informações armazenadas em res.locals
    const userInfo = res.locals.userInfo;
    // Verifique se userInfo está definido antes de acessar suas propriedades
    if (!userInfo) {
        return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    }
    const userId = userInfo.userId;
    try {
        // Inserir categoria no banco de dados
        const { data, error } = yield categoriaService.criarCategoria(nome, cor, userId);
        if (error) {
            throw new Error(error.message);
        }
        // Verificar se a inserção foi bem-sucedida
        if (data) {
            return res.status(201).json({ message: 'Categoria criada com sucesso.', categoria: data });
        }
        else {
            throw new Error('Inserção no banco de dados falhou.');
        }
    }
    catch (error) {
        console.error('Erro durante a criação da categoria:', error);
        return res.status(500).json({ error: 'Erro durante a criação da categoria.' + error });
    }
});
exports.criarCategoria = criarCategoria;
const listarCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Acesse as informações armazenadas em res.locals
    const userInfo = res.locals.userInfo;
    // Verifique se userInfo está definido antes de acessar suas propriedades
    if (!userInfo) {
        return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    }
    const userId = userInfo.userId;
    try {
        // Inserir categoria no banco de dados
        const { data, error } = yield categoriaService.listarCategorias(userId);
        if (error) {
            throw new Error(error.message);
        }
        // Verificar se a inserção foi bem-sucedida
        if (data) {
            return res.status(200).json({ message: 'Categorias listadas com sucesso', lista_categorias: data });
        }
        else {
            throw new Error('Busca no banco falhou.');
        }
    }
    catch (error) {
        console.error('Erro durante a busca das categorias:', error);
        return res.status(500).json({ error: 'Erro durante a busca das categorias.' + error });
    }
});
exports.listarCategorias = listarCategorias;
const atualizarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, cor } = req.body;
    const id = req.params.categoriaId;
    try {
        // Atualizar categoria no banco de dados
        const { data, error } = yield categoriaService.atualizarCategoria(nome, cor, id);
        if (error) {
            throw new Error(error.message);
        }
        // Verificar se a atualização foi bem-sucedida
        if (data) {
            return res.json({ message: 'Categoria atualizada com sucesso.', categoria: data });
        }
        else {
            throw new Error('Atualização no banco de dados falhou.');
        }
    }
    catch (error) {
        console.error('Erro durante a atualização da categoria:', error);
        return res.status(500).json({ error: 'Erro durante a atualização da categoria.' + error });
    }
});
exports.atualizarCategoria = atualizarCategoria;
const excluirCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.categoriaId;
    try {
        // Excluir categoria do banco de dados
        const { data, error } = yield categoriaService.excluirCategoria(id);
        if (error) {
            throw new Error(error.message);
        }
        // Verificar se a exclusão foi bem-sucedida
        if (data) {
            return res.json({ message: 'Categoria excluída com sucesso.', categoria: data });
        }
        else {
            throw new Error('Exclusão no banco de dados falhou.');
        }
    }
    catch (error) {
        console.error('Erro durante a exclusão da categoria:', error);
        return res.status(500).json({ error: 'Erro durante a exclusão da categoria.' + error });
    }
});
exports.excluirCategoria = excluirCategoria;
