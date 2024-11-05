"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partes_1 = require("../controllers/partes");
const router = (0, express_1.Router)();
router.get('/', partes_1.getAll);
router.get('/:id', partes_1.getById);
router.delete('/:id', partes_1.deleteparte);
router.post('/', partes_1.postparte);
router.put('/:id', partes_1.updateparte);
router.post('/comprobarparte', partes_1.comprobarparte);
exports.default = router;
