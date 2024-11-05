import {Router} from 'express';
import { deleteUser, login, getAllUser, postUser, updateUser, logout, getUser } from '../controllers/user';

const router = Router();
router.get('/', getAllUser);
router.get('/:id', getUser);
router.post('/:ban', login);
router.delete('/:id', deleteUser);
router.post('/', postUser);
router.put('/:id', updateUser);
router.get('/logout', logout);

export default router;