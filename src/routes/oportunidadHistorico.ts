import {Router} from 'express';
import {getAll,getById,deleteoportunidadHistorico,postoportunidadHistorico,updateoportunidadHistorico,getPrecio, getByDocumento} from '../controllers/oportunidadHistorico';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/resumen/:id', getPrecio);
router.get('/getByDocumento/:id',getByDocumento);
router.delete('/:id', deleteoportunidadHistorico);
router.post('/', postoportunidadHistorico);
router.put('/:id', updateoportunidadHistorico);

export default router;