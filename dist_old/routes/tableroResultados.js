"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tableroResultados_1 = require("../controllers/tableroResultados");
const router = (0, express_1.Router)();
router.get('/tableroGral', tableroResultados_1.tableroGral);
router.get('/tableroCotizacion', tableroResultados_1.tableroCotizacion);
exports.default = router;
