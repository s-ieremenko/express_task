import express, { Express } from 'express';
import morgan from 'morgan';
import { port } from './constants';
import router from './routes';

const app: Express = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Server starts listening on port ${port}`));
