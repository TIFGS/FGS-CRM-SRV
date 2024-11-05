import {Router} from 'express';
import { deletecotizacionesPrealta, getAll, postcotizacionesPrealta, updatecotizacionesPrealta, getById, getBycotizaciones_idcotizaciones, getByprealta_idPreAlta, } from '../controllers/cotizacionesPrealta';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/prealta_idPreAlta/:id', getByprealta_idPreAlta);
router.get('/cotizaciones_idcotizaciones/:id', getBycotizaciones_idcotizaciones);
router.delete('/:id', deletecotizacionesPrealta);
router.post('/', postcotizacionesPrealta);
router.put('/:id', updatecotizacionesPrealta);

export default router;