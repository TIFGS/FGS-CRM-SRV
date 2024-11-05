import {Router} from 'express';
import { deleteProspeccion, getAll, postProspeccion, updateProspeccion, getById, getResumen, getByclientePlanta_idclientePlanta,getAllDependencias, getByIdDependencias, postProspeccionDependencias } from '../controllers/prospeccion';

const router = Router();
router.get('/', getAll);
router.get('/AllDependencias/', getAllDependencias);
router.get('/getByIdDependencias/:id', getByIdDependencias);
router.get('/:id', getById);
router.get('/resumen/:id', getResumen);
router.delete('/:id', deleteProspeccion);
router.post('/', postProspeccion);
router.post('/dependencias', postProspeccionDependencias);
router.put('/:id', updateProspeccion);
router.get('/clientePlanta_idclientePlanta/:id', getByclientePlanta_idclientePlanta);

export default router;