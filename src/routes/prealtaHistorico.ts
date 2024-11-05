import {Router} from 'express';
import {getAll,getById,deleteprealtaHistorico,postprealtaHistorico,updateprealtaHistorico,getPrecio, getByDocumento} from '../controllers/prealtaHistorico';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/resumen/:id', getPrecio);
router.get('/getByDocumento/:id',getByDocumento);
router.delete('/:id', deleteprealtaHistorico);
router.post('/', postprealtaHistorico);
router.put('/:id', updateprealtaHistorico);

export default router;