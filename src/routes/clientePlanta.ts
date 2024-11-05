import {Router} from 'express';
import { deleteclientePlanta, getAll, postclientePlanta, updateclientePlanta, getById, getBycliente_idcliente, getByplanta_idplanta, getByvendedor_idvendedor,getAllDependecias} from '../controllers/clientePlanta';

const router = Router();
router.get('/', getAll);
router.get('/AllDependencias', getAllDependecias);
router.get('/:id', getById);
router.get('/planta_idplanta/:id', getByplanta_idplanta);
router.get('/cliente_idcliente/:id', getBycliente_idcliente);
router.get('/vendedor_idvendedor/:id', getByvendedor_idvendedor);
router.delete('/:id', deleteclientePlanta);
router.post('/', postclientePlanta);
router.put('/:id', updateclientePlanta);

export default router;
