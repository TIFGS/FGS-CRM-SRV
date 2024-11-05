import {Router} from 'express';
import { deleteoportunidadesProspecciones, getAll, postoportunidadesProspecciones, updateoportunidadesProspecciones, getById, getByprospecciones_idprospecciones, getByoportunidades_idoportunidades } from '../controllers/oportunidadesProspecciones';

const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.get('/oportunidades_idoportunidades/:id', getByoportunidades_idoportunidades);
router.get('/prospecciones_idprospecciones/:id', getByprospecciones_idprospecciones);
router.delete('/:id', deleteoportunidadesProspecciones);
router.post('/', postoportunidadesProspecciones);
router.put('/:id', updateoportunidadesProspecciones);

export default router;
