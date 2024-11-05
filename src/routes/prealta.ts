import {Router} from 'express';
import { deletePrealta, getAll, postPrealta, updatePrealta, getById, getResumen, getByclientePlanta_idclientePlanta, getAllDependencias, getByIdDependencias, postPrealtaDependencias } from '../controllers/prealta';

const router = Router();
router.get('/', getAll);
router.get('/AllDependencias/', getAllDependencias);
router.get('/:id', getById);
router.get('/getByIdDependencias/:id', getByIdDependencias);
router.get('/resumen/:id', getResumen);
router.delete('/:id', deletePrealta);
router.post('/', postPrealta);
router.post('/dependencias', postPrealtaDependencias);
router.put('/:id', updatePrealta);
router.get('/clientePlanta_idclientePlanta/:id', getByclientePlanta_idclientePlanta);

export default router;