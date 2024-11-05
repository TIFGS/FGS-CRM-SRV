import {Router} from 'express';
import { deleteArea, getAll, postArea, updateArea, getById, getByplanta_idplanta, getGroupByNombre} from '../controllers/area';

const router = Router();
router.get('/', getAll);
router.get('/getGroupByNombre/', getGroupByNombre);
router.get('/getByplanta_idplanta/:id', getByplanta_idplanta);
router.get('/:id', getById);
router.delete('/:id', deleteArea);
router.post('/', postArea);
router.put('/:id', updateArea);

export default router;