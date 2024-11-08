"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prospeccion_1 = require("../controllers/prospeccion");
const router = (0, express_1.Router)();
router.get('/', prospeccion_1.getAll);
router.get('/AllDependencias/', prospeccion_1.getAllDependencias);
router.get('/getByIdDependencias/:id', prospeccion_1.getByIdDependencias);
router.get('/:id', prospeccion_1.getById);
router.get('/resumen/:id', prospeccion_1.getResumen);
router.delete('/:id', prospeccion_1.deleteProspeccion);
router.post('/', prospeccion_1.postProspeccion);
router.post('/dependencias', prospeccion_1.postProspeccionDependencias);
router.put('/:id', prospeccion_1.updateProspeccion);
router.get('/clientePlanta_idclientePlanta/:id', prospeccion_1.getByclientePlanta_idclientePlanta);
exports.default = router;
