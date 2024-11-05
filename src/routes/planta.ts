import {Router} from 'express';
import { deleteplanta, getAll, postplanta, updateplanta, getById, getBymarca_idmarca} from '../controllers/planta';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/marca_idmarca/:id', getBymarca_idmarca);
router.delete('/:id', deleteplanta);
router.post('/', postplanta);
router.put('/:id', updateplanta);

export default router;
