import {Router} from 'express';
import { deleteFactura, getAll, postFactura, updateFactura, getById, getResumen, getByclientePlanta_idclientePlanta,getAllDependencias, getByIdDependencias, postFacturaDependencias } from '../controllers/factura';


const router = Router();
router.get('/', getAll);
router.get('/AllDependencias/', getAllDependencias);
router.get('/:id', getById);
router.get('/getByIdDependencias/:id', getByIdDependencias);
router.get('/resumen/:id', getResumen);
router.delete('/:id', deleteFactura);
router.post('/', postFactura);
router.post('/dependencias', postFacturaDependencias);
router.put('/:id', updateFactura);
router.get('/clientePlanta_idclientePlanta/:id', getByclientePlanta_idclientePlanta);

export default router;