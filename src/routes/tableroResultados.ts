import {Router} from 'express';

import {tableroCotizacion,tableroGral} from '../controllers/tableroResultados';

const router = Router();
router.get('/tableroGral', tableroGral);
router.get('/tableroCotizacion', tableroCotizacion);



export default router;