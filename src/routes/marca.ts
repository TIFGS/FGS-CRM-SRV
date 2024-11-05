import {Router} from 'express';
import { deleteMarca, getAll, postMarca, updateMarca, getById} from '../controllers/marca';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.delete('/:id', deleteMarca);
router.post('/', postMarca);
router.put('/:id', updateMarca);


export default router;