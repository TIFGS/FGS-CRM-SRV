import {Router} from 'express';
import {getAll,getById,getByIdDoc,del,post,update} from '../controllers/altaActividad';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/idDoc/:id', getByIdDoc);
router.delete('/:id', del);
router.post('/', post);
router.put('/:id', update);

export default router;