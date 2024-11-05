import {Router} from 'express';
import { deletecotizacionesAlta, getAll, postcotizacionesAlta, updatecotizacionesAlta, getById, getBycotizaciones_idcotizaciones, getByalta_idalta, } from '../controllers/cotizacionesAlta';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/alta_idalta/:id', getByalta_idalta);
router.get('/cotizaciones_idcotizaciones/:id', getBycotizaciones_idcotizaciones);
router.delete('/:id', deletecotizacionesAlta);
router.post('/', postcotizacionesAlta);
router.put('/:id', updatecotizacionesAlta);

export default router;