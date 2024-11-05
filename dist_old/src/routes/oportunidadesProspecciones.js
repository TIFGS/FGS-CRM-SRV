"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const oportunidadesProspecciones_1 = require("../controllers/oportunidadesProspecciones");
const router = (0, express_1.Router)();
router.get('/', oportunidadesProspecciones_1.getAll);
router.get('/:id', oportunidadesProspecciones_1.getById);
router.get('/oportunidades_idoportunidades/:id', oportunidadesProspecciones_1.getByoportunidades_idoportunidades);
router.get('/prospecciones_idprospecciones/:id', oportunidadesProspecciones_1.getByprospecciones_idprospecciones);
router.delete('/:id', oportunidadesProspecciones_1.deleteoportunidadesProspecciones);
router.post('/', oportunidadesProspecciones_1.postoportunidadesProspecciones);
router.put('/:id', oportunidadesProspecciones_1.updateoportunidadesProspecciones);
exports.default = router;