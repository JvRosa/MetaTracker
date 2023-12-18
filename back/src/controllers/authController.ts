
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
import * as authService from '../services/authService';

// Chave secreta do SUPABASE para assinar tokens
const secretKey = '3QtDdIcwKQywrFANXA014iTaCN0qAyFCPSzQc8pmk4t/j/tgQE/3mG643KE3qYSy0W0y8kJnzwXWuzHEZSMeMw==';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
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

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  console.log("email:", email)
  console.log("senha:", senha)
  try {
    const { data, error } = await authService.signInWithPassword(email, senha);

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
}

export const register = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const { data, error } = await authService.signUp(email, senha);

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
}
