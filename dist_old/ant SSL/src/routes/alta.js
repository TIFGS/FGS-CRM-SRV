"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alta_1 = require("../controllers/alta");
const router = (0, express_1.Router)();
router.get('/', alta_1.getAll);
router.get('/:id', alta_1.getById);
router.get('/resumen/:id', alta_1.getResumen);
router.delete('/:id', alta_1.deleteAlta);
router.post('/', alta_1.postAlta);
router.put('/:id', alta_1.updateAlta);
exports.default = router;
