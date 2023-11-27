import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
