"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permiso_1 = require("../controllers/permiso");
const router = (0, express_1.Router)();
router.get('/', permiso_1.getAllPermisos);
router.get('/:id', permiso_1.getPermiso);
router.delete('/:id', permiso_1.deletePermiso);
router.post('/', permiso_1.postPermiso);
router.put('/:id', permiso_1.updatePermiso);
exports.default = router;