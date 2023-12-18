import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';
import categoriaRoutes from './routes/categoriaRoutes';
import cardRoutes from './routes/cardRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, API!');
});

app.use('/', authRoutes);
app.use('/', categoriaRoutes);
app.use('/', cardRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

