import express, { Request, Response } from 'express';
import * as authService from '../services/authService';
import { verifyToken } from '../controllers/authController';
import * as categoriaController from '../controllers/categoriaController';


const categoriaRouter = express.Router();

categoriaRouter.use('/categorias', verifyToken);

categoriaRouter.use('/categorias/:categoriaId', verifyToken);

// Rota para criar uma nova categoria
categoriaRouter.post('/categorias', categoriaController.criarCategoria)

// Rota para listar as categorias de um usuario com o token
categoriaRouter.get('/categorias', categoriaController.listarCategorias)

// Rota para atualizar a categoria
categoriaRouter.put('/categorias/:categoriaId', categoriaController.atualizarCategoria)

// Rota para excluir uma categoria
categoriaRouter.delete('/categorias/:categoriaId', categoriaController.excluirCategoria)

export default categoriaRouter;
