import {Router} from 'express';
import {getAll,getById,deleteprospeccionHistorico,postprospeccionHistorico,updateprospeccionHistorico,getPrecio, getByDocumento} from '../controllers/prospeccionHistorico';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/resumen/:id', getPrecio);
router.get('/getByDocumento/:id',getByDocumento);
router.delete('/:id', deleteprospeccionHistorico);
router.post('/', postprospeccionHistorico);
router.put('/:id', updateprospeccionHistorico);

export default router;