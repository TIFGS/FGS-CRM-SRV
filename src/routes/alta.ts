import {Router} from 'express';
import { deleteAlta, getAll, postAlta, updateAlta, getById, getResumen, getByclientePlanta_idclientePlanta,getAllDependencias, getByIdDependencias, postAltaDependencias, getPMA } from '../controllers/alta';

const router = Router();
router.get('/', getAll);
router.get('/AllDependencias/', getAllDependencias);
router.get( '/PMA', getPMA);
router.get('/:id', getById);
router.get('/getByIdDependencias/:id', getByIdDependencias);
router.get('/resumen/:id', getResumen);
router.delete('/:id', deleteAlta);
router.post('/', postAlta);
router.post('/dependencias', postAltaDependencias);
router.put('/:id', updateAlta);
router.get('/clientePlanta_idclientePlanta/:id', getByclientePlanta_idclientePlanta);

export default router;