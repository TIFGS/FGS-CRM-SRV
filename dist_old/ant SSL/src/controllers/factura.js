"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResumen = exports.updateFactura = exports.postFactura = exports.deleteFactura = exports.getById = exports.getAll = void 0;
const factura_1 = __importDefault(require("../models/factura"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield factura_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const factura = yield factura_1.default.findByPk(id);
    if (factura)
        res.json(factura);
    else {
        res.status(404).json({
            msg: `No existe una factura con ese id ${id}`
        });
    }
});
exports.getById = getById;
const deleteFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const factura = yield factura_1.default.findByPk(id);
    if (!factura) {
        res.status(404).json({
            msg: `No se encontro ninguna factura con id ${id}`
        });
    }
    else {
        yield factura.destroy();
        res.json({
            msg: `La factura fue eliminada con exito!`
        });
    }
});
exports.deleteFactura = deleteFactura;
const postFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield factura_1.default.create(body);
    res.json({
        msg: 'La factura se agrego con exito!'
    });
});
exports.postFactura = postFactura;
const updateFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const factura = yield factura_1.default.findByPk(id);
    if (factura) {
        yield factura.update(body);
        res.json({
            msg: 'La factura se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun factura con id ${id}`
        });
    }
});
exports.updateFactura = updateFactura;
const getResumen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const factura_list = yield factura_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (factura_list.length > 0) {
        const cotizaciones = factura_list.map((alta) => alta.getDataValue('probabilidad'));
        resumen[0] = cotizaciones.filter((probabilidad) => probabilidad === 0).length;
        resumen[1] = cotizaciones.filter((probabilidad) => probabilidad === 1).length;
        resumen[2] = cotizaciones.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
});
exports.getResumen = getResumen;
