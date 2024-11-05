import {Router} from 'express';
import { deleteCliente, getAll, postCliente, updateCliente, getById} from '../controllers/cliente';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.delete('/:id', deleteCliente);
router.post('/', postCliente);
router.put('/:id', updateCliente);

export default router;