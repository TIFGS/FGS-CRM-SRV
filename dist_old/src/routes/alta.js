"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alta_1 = require("../controllers/alta");
const router = (0, express_1.Router)();
router.get('/', alta_1.getAll);
router.get('/AllDependencias/', alta_1.getAllDependencias);
router.get('/PMA', alta_1.getPMA);
router.get('/:id', alta_1.getById);
router.get('/getByIdDependencias/:id', alta_1.getByIdDependencias);
router.get('/resumen/:id', alta_1.getResumen);
router.delete('/:id', alta_1.deleteAlta);
router.post('/', alta_1.postAlta);
router.post('/dependencias', alta_1.postAltaDependencias);
router.put('/:id', alta_1.updateAlta);
router.get('/clientePlanta_idclientePlanta/:id', alta_1.getByclientePlanta_idclientePlanta);
exports.default = router;
