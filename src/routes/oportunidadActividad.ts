import {Router} from 'express';
import {getAll,getById,del,post,update,getByIdDoc} from '../controllers/oportunidadActividad';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/idDoc/:id', getByIdDoc);
router.delete('/:id', del);
router.post('/', post);
router.put('/:id', update);

export default router;