import { Router } from 'express';
import { getuserRole, postLoginController } from '../controllers/UserController';
import {
  validateLoginFields,
  validateLoginInfo,
  verifyToken,
} from '../middlewares/LoginMiddleware';
// import userController from '../controllers/UserController';

// const { postUsers } = userController;

const router = Router();

router.post('/', validateLoginFields, validateLoginInfo, postLoginController);
router.get('/validate', verifyToken, getuserRole);
export default router;
