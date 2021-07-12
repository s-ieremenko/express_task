import express, { Express } from 'express';
import morgan from 'morgan';
import router from './routes';

const app: Express = express();
const port: number = 3000;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Server starts listening on port ${port}`));
