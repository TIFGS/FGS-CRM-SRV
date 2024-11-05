import {Router} from 'express';
import { deleteCotizacion, getAll, postCotizacion, updateCotizacion, getById, getResumen, getByclientePlanta_idclientePlanta, getAllDependencias, getByIdDependencias, postCotizacionDependencias, } from '../controllers/cotizacion';

const router = Router();
router.get('/', getAll);
router.get('/AllDependencias',getAllDependencias);
router.get('/:id', getById);
router.get('/getByIdDependencias/:id', getByIdDependencias);
router.get('/resumen/:id', getResumen);
router.delete('/:id', deleteCotizacion);
router.post('/', postCotizacion);
router.post('/dependencias', postCotizacionDependencias);
router.put('/:id', updateCotizacion);
router.get('/clientePlanta_idclientePlanta/:id', getByclientePlanta_idclientePlanta);

export default router;