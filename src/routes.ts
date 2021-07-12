import * as express from 'express';
import { Router } from 'express';
import { Controller } from './controllers';

const router: Router = express.Router();

// tried route method to use all the CRUD methods in one chain

// router
//   .route('/')
//   .get(Controller.readFile)
//   .post(Controller.createFile)
//   .patch(Controller.updateFile)
//   .delete(Controller.deleteFile);

router.get('/', Controller.readFile);
router.post('/post', Controller.createFile);
router.patch('/patch', Controller.updateFile);
router.delete('/delete', Controller.deleteFile);

export default router;
