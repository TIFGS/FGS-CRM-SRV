import {Router} from 'express';
import {getAll,getById,deletecotizacionHistorico,postcotizacionHistorico,updatecotizacionHistorico,getPrecio, getByDocumento} from '../controllers/cotizacionHistorico';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/resumen/:id', getPrecio);
router.get('/getByDocumento/:id',getByDocumento);
router.delete('/:id', deletecotizacionHistorico);
router.post('/', postcotizacionHistorico);
router.put('/:id', updatecotizacionHistorico);

export default router;