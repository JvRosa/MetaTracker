import express, { Request, Response, NextFunction } from 'express';

import * as bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tafnoqvfojluvdtyumas.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZm5vcXZmb2psdXZkdHl1bWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2OTM0NjcsImV4cCI6MjAxNjI2OTQ2N30.r4lQtdAlOmLkrrdbtuCs2JZbXaCj3YMn_GtLU3Bof2w'
);

const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// Chave secreta do SUPABASE para assinar tokens
const secretKey = '3QtDdIcwKQywrFANXA014iTaCN0qAyFCPSzQc8pmk4t/j/tgQE/3mG643KE3qYSy0W0y8kJnzwXWuzHEZSMeMw==';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado.' });
  }

  try {
    const payload: any = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
    console.log(payload)
    if (!payload.aud) {
      return res.status(401).json({ error: 'Acesso negado.' });
    }

    // Armazene as informações em res.locals para que a próxima rota possa acessar
    res.locals.userInfo = {
      userId: payload.sub,
      // Adicione mais informações se necessário
    };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Sessão expirada, realize um novo login.' });
    } else {
      return res.status(401).json({ error: 'Acesso negado.' });
    }
  }
};

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, API!');
});

// Rota para criar um novo usuário
app.post('/register', async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: senha,
    })

    if (error) {
      throw new Error(error.message);
    }

    if (data) {
      console.log(data)
      return res.status(201).json({ message: 'Usuário cadastrado com sucesso.', user: data });
    } else {
      throw new Error('Inserção no banco de dados falhou.');
    }
  } catch (error) {
    console.error('Erro durante o registro:', error);
    return res.status(500).json({ error: 'Erro durante o registro.' + error });
  }
});

// Rota para realizar login
app.post('/login', async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    })

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    const user = data;
    return res.json({ message: 'Login bem-sucedido.', userdata: user });

  } catch (error) {
    console.error('Erro durante o login:', error);
    return res.status(500).json({ error: 'Erro durante o login.' + error });
  }
});
app.use('/categorias', verifyToken);
// Rota para criar uma nova categoria
app.post('/categorias', async (req: Request, res: Response) => {
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
    const { data, error } = await supabase
      .from('categoria')
      .insert({ nome, cor, user_id: userId })
      .select();

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
});

// Rota para listar as categorias de um usuario com o token
app.get('/categorias', async (req: Request, res: Response) => {
  // Acesse as informações armazenadas em res.locals
  const userInfo = res.locals.userInfo as { userId: string } | undefined;

  // Verifique se userInfo está definido antes de acessar suas propriedades
  if (!userInfo) {
    return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
  }
  const userId = userInfo.userId;

  try {
    // Inserir categoria no banco de dados
    const { data, error } = await supabase
    .from('categoria')
    .select()
    .eq('user_id', userId);
  
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
});

app.use('/categorias/:categoriaId', verifyToken);
// Rota para atualizar a categoria
app.put('/categorias/:categoriaId', async (req: Request, res: Response) => {
  const { nome, cor } = req.body;
  const id = req.params.categoriaId;

  try {
    // Atualizar categoria no banco de dados
    const { data, error } = await supabase
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
    } else {
      throw new Error('Atualização no banco de dados falhou.');
    }
  } catch (error) {
    console.error('Erro durante a atualização da categoria:', error);
    return res.status(500).json({ error: 'Erro durante a atualização da categoria.' + error });
  }
});


// Rota para excluir uma categoria
app.delete('/categorias/:categoriaId', async (req: Request, res: Response) => {
  const id = req.params.categoriaId;

  try {
    // Excluir categoria do banco de dados
    const { data, error } = await supabase
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
    } else {
      throw new Error('Exclusão no banco de dados falhou.');
    }
  } catch (error) {
    console.error('Erro durante a exclusão da categoria:', error);
    return res.status(500).json({ error: 'Erro durante a exclusão da categoria.' + error });
  }
});
app.use('/cards', verifyToken);

// Rota para criar uma meta/card
app.post('/cards', async (req: Request, res: Response) => {
  const { texto, categoria, status } = req.body;
  // Acesse as informações armazenadas em res.locals
  const userInfo = res.locals.userInfo as { userId: string } | undefined;

  // Verifique se userInfo está definido antes de acessar suas propriedades
  if (!userInfo) {
    return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
  }
  const userId = userInfo.userId;

  try {
    // Inserir card no banco de dados
    const { data, error } = await supabase
      .from('card')
      .insert({ texto, categoria, status, user_id: userId })
      .select();
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
});

// Rota para listar as categorias de um usuario com o token
app.get('/cards', async (req: Request, res: Response) => {
  // Acesse as informações armazenadas em res.locals
  const userInfo = res.locals.userInfo as { userId: string } | undefined;

  // Verifique se userInfo está definido antes de acessar suas propriedades
  if (!userInfo) {
    return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
  }
  const userId = userInfo.userId;

  try {
    // Inserir categoria no banco de dados
    const { data, error } = await supabase
    .from('card')
    .select()
    .eq('user_id', userId);
  
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
});

app.use('/cards/:cardId', verifyToken);

// Rota para atualizar a meta/card
app.put('/cards/:cardId', async (req: Request, res: Response) => {
  const { texto, categoria, status, data_terminou} = req.body;
  const id = req.params.cardId;

  try {
    // Atualizar card no banco de dados
    const { data, error } = await supabase
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
    } else {
      throw new Error('Atualização no banco de dados falhou.');
    }
  } catch (error) {
    console.error('Erro durante a atualização da meta:', error);
    return res.status(500).json({ error: 'Erro durante a atualização da meta.' + error });
  }
});

app.use('/cards/:cardId/:newCategoriaId', verifyToken);

// Rota para trocar card de categoria
app.put('/cards/:cardId/:newCategoriaId', async (req: Request, res: Response) => {
  const cardId = req.params.cardId;
  const newCategoriaId = req.params.newCategoriaId;

  try {
    // Atualizar categoria do card no banco de dados
    const { data, error } = await supabase
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
    } else {
      throw new Error('Atualização no banco de dados falhou.');
    }
  } catch (error) {
    console.error('Erro durante a troca de categoria da meta:', error);
    return res.status(500).json({ error: 'Erro durante a troca de categoria da meta.' + error });
  }
});

// Rota para excluir uma meta/card
app.delete('/cards/:cardId', verifyToken, async (req: Request, res: Response) => {
  const cardId = req.params.cardId;

  try {
    // Excluir card do banco de dados
    const { data, error } = await supabase
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
    } else {
      throw new Error('Exclusão no banco de dados falhou.');
    }
  } catch (error) {
    console.error('Erro durante a exclusão da meta:', error);
    return res.status(500).json({ error: 'Erro durante a exclusão da meta.' + error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

