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
exports.register = exports.login = exports.verifyToken = void 0;
const jwt = require('jsonwebtoken');
const authService = __importStar(require("../services/authService"));
// Chave secreta do SUPABASE para assinar tokens
const secretKey = '3QtDdIcwKQywrFANXA014iTaCN0qAyFCPSzQc8pmk4t/j/tgQE/3mG643KE3qYSy0W0y8kJnzwXWuzHEZSMeMw==';
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado.' });
    }
    try {
        const payload = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        console.log(payload);
        if (!payload.aud) {
            return res.status(401).json({ error: 'Acesso negado.' });
        }
        // Armazene as informações em res.locals para que a próxima rota possa acessar
        res.locals.userInfo = {
            userId: payload.sub,
            // Adicione mais informações se necessário
        };
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Sessão expirada, realize um novo login.' });
        }
        else {
            return res.status(401).json({ error: 'Acesso negado.' });
        }
    }
};
exports.verifyToken = verifyToken;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    console.log("email:", email);
    console.log("senha:", senha);
    try {
        const { data, error } = yield authService.signInWithPassword(email, senha);
        if (error) {
            throw new Error(error.message);
        }
        if (!data) {
            return res.status(401).json({ error: 'Usuário não encontrado.' });
        }
        const user = data;
        return res.json({ message: 'Login bem-sucedido.', userdata: user });
    }
    catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).json({ error: 'Erro durante o login.' + error });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    try {
        const { data, error } = yield authService.signUp(email, senha);
        if (error) {
            throw new Error(error.message);
        }
        if (data) {
            console.log(data);
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso.', user: data });
        }
        else {
            throw new Error('Inserção no banco de dados falhou.');
        }
    }
    catch (error) {
        console.error('Erro durante o registro:', error);
        return res.status(500).json({ error: 'Erro durante o registro.' + error });
    }
});
exports.register = register;
