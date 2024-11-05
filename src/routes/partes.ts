import {Router} from 'express';
import { getAll, getById, deleteparte, postparte, updateparte,comprobarparte } from '../controllers/partes';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.delete('/:id', deleteparte);
router.post('/', postparte);
router.put('/:id', updateparte);
router.post('/comprobarparte',comprobarparte);

export default router;