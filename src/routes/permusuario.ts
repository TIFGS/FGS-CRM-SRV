import {Router} from 'express';
import { deletePermuser, getAllPermuser, postPermuser, updatePermuser, getPermuser, getPermuserIds } from '../controllers/permusuario';

const router = Router();
router.get('/All/:id_usuario', getAllPermuser);
router.get('/AllIds/:id_usuario', getPermuserIds);
router.get('/:id_usuario', getPermuser);
router.delete('/:id', deletePermuser);
router.post('/', postPermuser);
router.put('/:id', updatePermuser);

export default router;