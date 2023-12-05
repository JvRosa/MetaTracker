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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)('https://tafnoqvfojluvdtyumas.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZm5vcXZmb2psdXZkdHl1bWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2OTM0NjcsImV4cCI6MjAxNjI2OTQ2N30.r4lQtdAlOmLkrrdbtuCs2JZbXaCj3YMn_GtLU3Bof2w');
const jwt = require('jsonwebtoken');
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('combined'));
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
app.get('/', (req, res) => {
    res.send('Hello, API!');
});
// Rota para criar um novo usuário
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    try {
        const { data, error } = yield supabase.auth.signUp({
            email: email,
            password: senha,
        });
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
}));
// Rota para realizar login
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    try {
        const { data, error } = yield supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        });
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
}));
app.use('/categorias', verifyToken);
// Rota para criar uma nova categoria
app.post('/categorias', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { data, error } = yield supabase
            .from('categoria')
            .insert({ nome, cor, user_id: userId })
            .select();
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
}));
// Rota para listar as categorias de um usuario com o token
app.get('/categorias', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Acesse as informações armazenadas em res.locals
    const userInfo = res.locals.userInfo;
    // Verifique se userInfo está definido antes de acessar suas propriedades
    if (!userInfo) {
        return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    }
    const userId = userInfo.userId;
    try {
        // Inserir categoria no banco de dados
        const { data, error } = yield supabase
            .from('categoria')
            .select()
            .eq('user_id', userId);
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
}));
app.use('/categorias/:categoriaId', verifyToken);
// Rota para atualizar a categoria
app.put('/categorias/:categoriaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, cor } = req.body;
    const id = req.params.categoriaId;
    try {
        // Atualizar categoria no banco de dados
        const { data, error } = yield supabase
            .from('categoria')
            .update({ nome, cor })
            .eq('id', id)
            .select();
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
}));
// Rota para excluir uma categoria
app.delete('/categorias/:categoriaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.categoriaId;
    try {
        // Excluir categoria do banco de dados
        const { data, error } = yield supabase
            .from('categoria')
            .delete()
            .eq('id', id)
            .select();
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
}));
app.use('/cards', verifyToken);
// Rota para criar uma meta/card
app.post('/cards', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { texto, categoria, status } = req.body;
    // Acesse as informações armazenadas em res.locals
    const userInfo = res.locals.userInfo;
    // Verifique se userInfo está definido antes de acessar suas propriedades
    if (!userInfo) {
        return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    }
    const userId = userInfo.userId;
    try {
        // Inserir card no banco de dados
        const { data, error } = yield supabase
            .from('card')
            .insert({ texto, categoria, status, user_id: userId })
            .select();
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
}));
// Rota para listar as categorias de um usuario com o token
app.get('/cards', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Acesse as informações armazenadas em res.locals
    const userInfo = res.locals.userInfo;
    // Verifique se userInfo está definido antes de acessar suas propriedades
    if (!userInfo) {
        return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    }
    const userId = userInfo.userId;
    try {
        // Inserir categoria no banco de dados
        const { data, error } = yield supabase
            .from('card')
            .select()
            .eq('user_id', userId);
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
}));
app.use('/cards/:cardId', verifyToken);
// Rota para atualizar a meta/card
app.put('/cards/:cardId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { texto, categoria, status, data_terminou } = req.body;
    const id = req.params.cardId;
    try {
        // Atualizar card no banco de dados
        const { data, error } = yield supabase
            .from('card')
            .update({ texto, categoria, status, data_terminou })
            .eq('id', id)
            .select();
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
}));
app.use('/cards/:cardId/:newCategoriaId', verifyToken);
// Rota para trocar card de categoria
app.put('/cards/:cardId/:newCategoriaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cardId = req.params.cardId;
    const newCategoriaId = req.params.newCategoriaId;
    try {
        // Atualizar categoria do card no banco de dados
        const { data, error } = yield supabase
            .from('card')
            .update({ categoria: newCategoriaId })
            .eq('id', cardId)
            .select();
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
}));
// Rota para excluir uma meta/card
app.delete('/cards/:cardId', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cardId = req.params.cardId;
    try {
        // Excluir card do banco de dados
        const { data, error } = yield supabase
            .from('card')
            .delete()
            .eq('id', cardId)
            .select();
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
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
