"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facturaHistorico_1 = require("../controllers/facturaHistorico");
//import {getAll} from '../controllers/facturaHistorico';
const router = (0, express_1.Router)();
router.get('/', facturaHistorico_1.getAll);
router.get('/:id', facturaHistorico_1.getById);
router.get('/resumen/:id', facturaHistorico_1.getPrecio);
router.get('/getByDocumento/:id', facturaHistorico_1.getByDocumento);
router.delete('/:id', facturaHistorico_1.deletefacturaHistorico);
router.post('/', facturaHistorico_1.postfacturaHistorico);
router.put('/:id', facturaHistorico_1.updatefacturaHistorico);
exports.default = router;