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
exports.excluirMeta = exports.trocarCategoria = exports.atualizarMeta = exports.listarMetas = exports.criarMeta = void 0;
const cardService = __importStar(require("../services/cardService"));
const criarMeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { texto, categoria, status } = req.body;
    // Acesse as informações armazenadas em res.locals
    const userInfo = res.locals.userInfo;
    // Verifique se userInfo está definido antes de acessar suas propriedades
    if (!userInfo) {
        return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    }
    const userId = userInfo.userId;
    try {
        const { data, error } = yield cardService.criarMeta(texto, categoria, status, userId);
        if (error) {
            throw new Error(error.message);
        }
        // Verificar se a inserção foi bem-sucedida
        if (data) {
            return res.status(201).json({ message: 'Meta criada com sucesso.', meta: data });
        }
        else {
            throw new Error('Inserção no banco de dados falhou.');
        }
    }
    catch (error) {
        console.error('Erro durante a criação da meta:', error);
        return res.status(500).json({ error: 'Erro durante a criação da meta.' + error });
    }
});
exports.criarMeta = criarMeta;
const listarMetas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Acesse as informações armazenadas em res.locals
    const userInfo = res.locals.userInfo;
    // Verifique se userInfo está definido antes de acessar suas propriedades
    if (!userInfo) {
        return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    }
    const userId = userInfo.userId;
    try {
        // Inserir categoria no banco de dados
        const { data, error } = yield cardService.listarMetas(userId);
        if (error) {
            throw new Error(error.message);
        }
        // Verificar se a inserção foi bem-sucedida
        if (data) {
            return res.status(200).json({ message: 'Metas listadas com sucesso', lista_categorias: data });
        }
        else {
            throw new Error('Busca no banco falhou.');
        }
    }
    catch (error) {
        console.error('Erro durante a busca das metas:', error);
        return res.status(500).json({ error: 'Erro durante a busca das metas.' + error });
    }
});
exports.listarMetas = listarMetas;
const atualizarMeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { texto, categoria, status, data_terminou } = req.body;
    const id = req.params.cardId;
    try {
        // Atualizar card no banco de dados
        const { data, error } = yield cardService.atualizarMeta(texto, categoria, status, data_terminou, id);
        if (error) {
            throw new Error(error.message);
        }
        // Verificar se a atualização foi bem-sucedida
        if (data) {
            return res.json({ message: 'Meta atualizada com sucesso.', meta: data });
        }
        else {
            throw new Error('Atualização no banco de dados falhou.');
        }
    }
    catch (error) {
        console.error('Erro durante a atualização da meta:', error);
        return res.status(500).json({ error: 'Erro durante a atualização da meta.' + error });
    }
});
exports.atualizarMeta = atualizarMeta;
const trocarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cardId = req.params.cardId;
    const newCategoriaId = req.params.newCategoriaId;
    try {
        // Atualizar categoria do card no banco de dados
        const { data, error } = yield cardService.trocarCategoria(newCategoriaId, cardId);
        if (error) {
            throw new Error(error.message);
        }
        // Verificar se a atualização foi bem-sucedida
        if (data) {
            const updatedCardId = data;
            return res.json({ message: 'Categoria da meta alterada com sucesso.', meta: data });
        }
        else {
            throw new Error('Atualização no banco de dados falhou.');
        }
    }
    catch (error) {
        console.error('Erro durante a troca de categoria da meta:', error);
        return res.status(500).json({ error: 'Erro durante a troca de categoria da meta.' + error });
    }
});
exports.trocarCategoria = trocarCategoria;
const excluirMeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cardId = req.params.cardId;
    try {
        // Excluir card do banco de dados
        const { data, error } = yield cardService.excluirMeta(cardId);
        if (error) {
            throw new Error(error.message);
        }
        // Verificar se a exclusão foi bem-sucedida
        if (data) {
            const deletedCardId = data;
            return res.json({ message: 'Meta excluída com sucesso.', meta: data });
        }
        else {
            throw new Error('Exclusão no banco de dados falhou.');
        }
    }
    catch (error) {
        console.error('Erro durante a exclusão da meta:', error);
        return res.status(500).json({ error: 'Erro durante a exclusão da meta.' + error });
    }
});
exports.excluirMeta = excluirMeta;
