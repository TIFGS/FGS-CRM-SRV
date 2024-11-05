import {Router} from 'express';
import {getAll,getById,deletealtaHistorico,postaltaHistorico,updatealtaHistorico,getPrecio, getByDocumento} from '../controllers/altaHistorico';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/resumen/:id', getPrecio);
router.get('/getByDocumento/:id',getByDocumento);
router.delete('/:id', deletealtaHistorico);
router.post('/', postaltaHistorico);
router.put('/:id', updatealtaHistorico);

export default router;