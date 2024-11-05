import {Router} from 'express';
import { deleteprealtaAlta, getAll, postprealtaAlta, updateprealtaAlta, getById, getByprealta_idprealta, getByalta_idalta, } from '../controllers/prealtaAlta';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/alta_idalta/:id', getByalta_idalta);
router.get('/prealta_idprealta/:id', getByprealta_idprealta);
router.delete('/:id', deleteprealtaAlta);
router.post('/', postprealtaAlta);
router.put('/:id', updateprealtaAlta);

export default router;