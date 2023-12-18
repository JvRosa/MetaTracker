import express, { Request, Response } from 'express';
import * as authService from '../services/authService';
import { verifyToken } from '../controllers/authController';
import * as cardController from '../controllers/cardController';

const cardRouter = express.Router();

cardRouter.use('/cards', verifyToken);
cardRouter.use('/cards/:cardId', verifyToken);
cardRouter.use('/cards/:cardId/:newCategoriaId', verifyToken);

// Rota para criar uma meta/card
cardRouter.post('/cards', cardController.criarMeta)

// Rota para listar as metas de um usuario com o token
cardRouter.get('/cards', cardController.listarMetas)

// Rota para atualizar a meta/card
cardRouter.put('/cards/:cardId', cardController.atualizarMeta)

// Rota para trocar card de categoria
cardRouter.put('/cards/:cardId/:newCategoriaId', cardController.trocarCategoria)

// Rota para excluir uma meta/card
cardRouter.delete('/cards/:cardId', cardController.excluirMeta)

export default cardRouter;
