import {Router} from 'express';
import { deletePermiso, getAllPermisos, postPermiso, updatePermiso, getPermiso } from '../controllers/permiso';

const router = Router();
router.get('/', getAllPermisos);
router.get('/:id', getPermiso);
router.delete('/:id', deletePermiso);
router.post('/', postPermiso);
router.put('/:id', updatePermiso);

export default router;