import {Router} from 'express';
import {getAll,getById,deletefacturaHistorico,postfacturaHistorico,updatefacturaHistorico,getPrecio, getByDocumento} from '../controllers/facturaHistorico';
//import {getAll} from '../controllers/facturaHistorico';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/resumen/:id', getPrecio);
router.get('/getByDocumento/:id',getByDocumento);
router.delete('/:id', deletefacturaHistorico);
router.post('/', postfacturaHistorico);
router.put('/:id', updatefacturaHistorico);

export default router;