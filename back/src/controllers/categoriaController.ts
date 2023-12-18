import { Request, Response } from 'express';
import * as categoriaService from '../services/categoriaService';


export const criarCategoria = async (req: Request, res: Response) => {
    const { nome, cor } = req.body;
    // Acesse as informações armazenadas em res.locals
    const userInfo = res.locals.userInfo as { userId: string } | undefined;

    // Verifique se userInfo está definido antes de acessar suas propriedades
    if (!userInfo) {
        return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    }
    const userId = userInfo.userId;

    try {
        // Inserir categoria no banco de dados
        const { data, error } = await categoriaService.criarCategoria(nome, cor, userId)

        if (error) {
            throw new Error(error.message);
        }

        // Verificar se a inserção foi bem-sucedida
        if (data) {
            return res.status(201).json({ message: 'Categoria criada com sucesso.', categoria: data });
        } else {
            throw new Error('Inserção no banco de dados falhou.');
        }
    } catch (error) {
        console.error('Erro durante a criação da categoria:', error);
        return res.status(500).json({ error: 'Erro durante a criação da categoria.' + error });
    }
}

export const listarCategorias = async (req: Request, res: Response) => {
    // Acesse as informações armazenadas em res.locals
    const userInfo = res.locals.userInfo as { userId: string } | undefined;

    // Verifique se userInfo está definido antes de acessar suas propriedades
    if (!userInfo) {
        return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    }
    const userId = userInfo.userId;

    try {
        // Inserir categoria no banco de dados
        const { data, error } = await categoriaService.listarCategorias(userId);

        if (error) {
            throw new Error(error.message);
        }

        // Verificar se a inserção foi bem-sucedida
        if (data) {
            return res.status(200).json({ message: 'Categorias listadas com sucesso', lista_categorias: data });
        } else {
            throw new Error('Busca no banco falhou.');
        }
    } catch (error) {
        console.error('Erro durante a busca das categorias:', error);
        return res.status(500).json({ error: 'Erro durante a busca das categorias.' + error });
    }
}

export const atualizarCategoria = async (req: Request, res: Response) => {
    const { nome, cor } = req.body;
    const id = req.params.categoriaId;

    try {
        // Atualizar categoria no banco de dados
        const { data, error } = await categoriaService.atualizarCategoria(nome, cor, id);

        if (error) {
            throw new Error(error.message);
        }

        // Verificar se a atualização foi bem-sucedida
        if (data) {
            return res.json({ message: 'Categoria atualizada com sucesso.', categoria: data });
        } else {
            throw new Error('Atualização no banco de dados falhou.');
        }
    } catch (error) {
        console.error('Erro durante a atualização da categoria:', error);
        return res.status(500).json({ error: 'Erro durante a atualização da categoria.' + error });
    }
}
export const excluirCategoria = async (req: Request, res: Response) => {
    const id = req.params.categoriaId;

    try {
        // Excluir categoria do banco de dados
        const { data, error } = await categoriaService.excluirCategoria(id);

        if (error) {
            throw new Error(error.message);
        }

        // Verificar se a exclusão foi bem-sucedida
        if (data) {
            return res.json({ message: 'Categoria excluída com sucesso.', categoria: data });
        } else {
            throw new Error('Exclusão no banco de dados falhou.');
        }
    } catch (error) {
        console.error('Erro durante a exclusão da categoria:', error);
        return res.status(500).json({ error: 'Erro durante a exclusão da categoria.' + error });
    }
}
