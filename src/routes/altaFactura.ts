import {Router} from 'express';
import { deletealtaFactura, getAll, postaltaFactura, updatealtaFactura, getById, getByfactura_idfactura, getByalta_idalta, } from '../controllers/altaFactura';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/alta_idalta/:id', getByalta_idalta);
router.get('/factura_idfactura/:id', getByfactura_idfactura);
router.delete('/:id', deletealtaFactura);
router.post('/', postaltaFactura);
router.put('/:id', updatealtaFactura);

export default router;