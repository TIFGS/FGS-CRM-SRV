import {Router} from 'express';
import { deleteOportunidad, getAll, getAllDependencias, postOportunidad, updateOportunidad, getById, getByIdDependencias, getResumen, getByclientePlanta_idclientePlanta, postOportunidadDependencias } from '../controllers/oportunidad';

const router = Router();
router.get('/', getAll);
router.get('/AllDependencias/', getAllDependencias);
router.get('/:id', getById);
router.get('/getByIdDependencias/:id', getByIdDependencias);
router.get('/resumen/:id', getResumen);
router.delete('/:id', deleteOportunidad);
router.post('/', postOportunidad);
router.post('/dependencias', postOportunidadDependencias);
router.put('/:id', updateOportunidad);
router.get('/clientePlanta_idclientePlanta/:id', getByclientePlanta_idclientePlanta);

export default router;