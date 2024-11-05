import {Router} from 'express';
import { deletevendedor, getAll, postvendedor, updatevendedor, getById, getAllDependencias, getByIdDependencias} from '../controllers/vendedor';

const router = Router();
router.get('/', getAll);
router.get('/getAllDependencias',getAllDependencias);
router.get('/getByIdDependencias/:id',getByIdDependencias);
router.get('/:id', getById);
router.delete('/:id', deletevendedor);
router.post('/', postvendedor);
router.put('/:id', updatevendedor);

export default router;
