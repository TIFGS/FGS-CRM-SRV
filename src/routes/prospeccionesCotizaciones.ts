import {Router} from 'express';
import { deleteprospeccionesCotizaciones, getAll, postprospeccionesCotizaciones, updateprospeccionesCotizaciones, getById, getByprospecciones_idprospecciones, getBycotizaciones_idcotizaciones, } from '../controllers/prospeccionesCotizaciones';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/cotizaciones_idcotizaciones/:id', getBycotizaciones_idcotizaciones);
router.get('/prospecciones_idprospecciones/:id', getByprospecciones_idprospecciones);
router.delete('/:id', deleteprospeccionesCotizaciones);
router.post('/', postprospeccionesCotizaciones);
router.put('/:id', updateprospeccionesCotizaciones);


export default router;
