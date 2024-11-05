import {Router} from 'express';

import {tableroCotizacion,tableroPrealta,tableroAlta,tableroFactura, tableroOportunidad, tableroProspeccion} from '../controllers/resultadosDocumentos';

const router = Router();
router.get('/tableroOportunidad/:id', tableroOportunidad);
router.get('/tableroProspeccion/:id', tableroProspeccion);
router.get('/tableroCotizacion/:id', tableroCotizacion);
router.get('/tableroPrealta/:id', tableroPrealta);
router.get('/tableroAlta/:id', tableroAlta);
router.get('/tableroFactura/:id', tableroFactura);



export default router;