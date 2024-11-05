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
exports.updatecotizacionesPrealta = exports.postcotizacionesPrealta = exports.deletecotizacionesPrealta = exports.getBycotizaciones_idcotizaciones = exports.getByprealta_idPreAlta = exports.getById = exports.getAll = void 0;
const cotizacionesPrealta_1 = __importDefault(require("../models/cotizacionesPrealta"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield cotizacionesPrealta_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield cotizacionesPrealta_1.default.findByPk(id);
    if (respuesta) {
        res.json(respuesta);
    }
    else {
        res.status(404).json({
            msg: `No existe una cotizacionesPrealta con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getByprealta_idPreAlta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield cotizacionesPrealta_1.default.findAll({ where: { prealta_idPreAlta: id } });
    if (respuesta) {
        res.json({
            msg: "Relaciones encontradas",
            response: respuesta
        });
    }
    else {
        res.status(404).json({
            msg: `No existe una cotizacionesPrealta con ese id ${id}`
        });
    }
});
exports.getByprealta_idPreAlta = getByprealta_idPreAlta;
const getBycotizaciones_idcotizaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield cotizacionesPrealta_1.default.findAll({ where: { cotizaciones_idcotizaciones: id } });
    if (respuesta) {
        res.json({
            msg: "Relaciones encontradas",
            response: respuesta
        });
    }
    else {
        res.status(404).json({
            msg: `No existe una cotizacionesPrealta con ese id ${id}`
        });
    }
});
exports.getBycotizaciones_idcotizaciones = getBycotizaciones_idcotizaciones;
const deletecotizacionesPrealta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield cotizacionesPrealta_1.default.findByPk(id);
    if (!respuesta) {
        res.status(404).json({
            msg: `No se encontro ningun cotizacionesPrealta con id ${id}`
        });
    }
    else {
        yield cotizacionesPrealta_1.default.destroy();
        res.json({
            msg: `El cotizacionesPrealta fue eliminado con exito!`
        });
    }
});
exports.deletecotizacionesPrealta = deletecotizacionesPrealta;
const postcotizacionesPrealta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield cotizacionesPrealta_1.default.create(body);
    res.json({
        msg: 'El cotizacionesPrealta se agrego con exito!'
    });
});
exports.postcotizacionesPrealta = postcotizacionesPrealta;
const updatecotizacionesPrealta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const respuesta = yield cotizacionesPrealta_1.default.findByPk(id);
    if (respuesta) {
        yield respuesta.update(body);
        res.json({
            msg: 'El cotizacionesPrealta se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun cotizacionesPrealta con id ${id}`
        });
    }
});
exports.updatecotizacionesPrealta = updatecotizacionesPrealta;
