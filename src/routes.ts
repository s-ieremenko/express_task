import * as express from 'express';
import { Router } from 'express';
import { Controller } from './controllers';

const router: Router = express.Router();

router.get('/', Controller.readFile);
router.post('/post', Controller.createFile);
router.patch('/patch', Controller.updateFile);
router.delete('/delete', Controller.deleteFile);

export default router;
