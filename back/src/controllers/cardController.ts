import { Request, Response } from 'express';
import * as authService from '../services/authService';
import * as cardService from '../services/cardService';


export const criarMeta = async (req: Request, res: Response) => {
  const { texto, categoria, status } = req.body;
  // Acesse as informações armazenadas em res.locals
  const userInfo = res.locals.userInfo as { userId: string } | undefined;

  // Verifique se userInfo está definido antes de acessar suas propriedades
  if (!userInfo) {
    return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
  }
  const userId = userInfo.userId;

  try {
    const { data, error } = await cardService.criarMeta(texto, categoria, status, userId);
    if (error) {
      throw new Error(error.message);
    }

    // Verificar se a inserção foi bem-sucedida
    if (data) {
      return res.status(201).json({ message: 'Meta criada com sucesso.', meta: data });
    } else {
      throw new Error('Inserção no banco de dados falhou.');
    }
  } catch (error) {
    console.error('Erro durante a criação da meta:', error);
    return res.status(500).json({ error: 'Erro durante a criação da meta.' + error });
  }
}

export const listarMetas = async (req: Request, res: Response) => {
  // Acesse as informações armazenadas em res.locals
  const userInfo = res.locals.userInfo as { userId: string } | undefined;

  // Verifique se userInfo está definido antes de acessar suas propriedades
  if (!userInfo) {
    return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
  }
  const userId = userInfo.userId;

  try {
    // Inserir categoria no banco de dados
    const { data, error } = await cardService.listarMetas(userId);

    if (error) {
      throw new Error(error.message);
    }

    // Verificar se a inserção foi bem-sucedida
    if (data) {
      return res.status(200).json({ message: 'Metas listadas com sucesso', lista_categorias: data });
    } else {
      throw new Error('Busca no banco falhou.');
    }
  } catch (error) {
    console.error('Erro durante a busca das metas:', error);
    return res.status(500).json({ error: 'Erro durante a busca das metas.' + error });
  }
}

export const atualizarMeta = async (req: Request, res: Response) => {
  const { texto, categoria, status, data_terminou } = req.body;
  const id = req.params.cardId;

  try {
    // Atualizar card no banco de dados
    const { data, error } = await cardService.atualizarMeta(texto, categoria, status, data_terminou, id);

    if (error) {
      throw new Error(error.message);
    }

    // Verificar se a atualização foi bem-sucedida
    if (data) {
      return res.json({ message: 'Meta atualizada com sucesso.', meta: data });
    } else {
      throw new Error('Atualização no banco de dados falhou.');
    }
  } catch (error) {
    console.error('Erro durante a atualização da meta:', error);
    return res.status(500).json({ error: 'Erro durante a atualização da meta.' + error });
  }
}
export const trocarCategoria = async (req: Request, res: Response) => {
  const cardId = req.params.cardId;
  const newCategoriaId = req.params.newCategoriaId;

  try {
    // Atualizar categoria do card no banco de dados
    const { data, error } = await cardService.trocarCategoria(newCategoriaId, cardId);

    if (error) {
      throw new Error(error.message);
    }

    // Verificar se a atualização foi bem-sucedida
    if (data) {
      const updatedCardId = data;
      return res.json({ message: 'Categoria da meta alterada com sucesso.', meta: data });
    } else {
      throw new Error('Atualização no banco de dados falhou.');
    }
  } catch (error) {
    console.error('Erro durante a troca de categoria da meta:', error);
    return res.status(500).json({ error: 'Erro durante a troca de categoria da meta.' + error });
  }
}
export const excluirMeta = async (req: Request, res: Response) => {
  const cardId = req.params.cardId;

  try {
    // Excluir card do banco de dados
    const { data, error } = await cardService.excluirMeta(cardId);

    if (error) {
      throw new Error(error.message);
    }

    // Verificar se a exclusão foi bem-sucedida
    if (data) {
      const deletedCardId = data;
      return res.json({ message: 'Meta excluída com sucesso.', meta: data });
    } else {
      throw new Error('Exclusão no banco de dados falhou.');
    }
  } catch (error) {
    console.error('Erro durante a exclusão da meta:', error);
    return res.status(500).json({ error: 'Erro durante a exclusão da meta.' + error });
  }
}