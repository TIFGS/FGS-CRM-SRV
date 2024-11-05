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
exports.updateprospeccionesCotizaciones = exports.postprospeccionesCotizaciones = exports.deleteprospeccionesCotizaciones = exports.getByprospecciones_idprospecciones = exports.getBycotizaciones_idcotizaciones = exports.getById = exports.getAll = void 0;
const prospeccionesCotizaciones_1 = __importDefault(require("../models/prospeccionesCotizaciones"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield prospeccionesCotizaciones_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield prospeccionesCotizaciones_1.default.findByPk(id);
    if (respuesta) {
        res.json(respuesta);
    }
    else {
        res.status(404).json({
            msg: `No existe una prospeccionesCotizaciones con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getBycotizaciones_idcotizaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield prospeccionesCotizaciones_1.default.findAll({ where: { cotizaciones_idcotizaciones: id } });
    if (respuesta) {
        res.json({
            msg: "Relaciones encontradas",
            response: respuesta
        });
    }
    else {
        res.status(404).json({
            msg: `No existe una prospeccionesCotizaciones con ese id ${id}`
        });
    }
});
exports.getBycotizaciones_idcotizaciones = getBycotizaciones_idcotizaciones;
const getByprospecciones_idprospecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield prospeccionesCotizaciones_1.default.findAll({ where: { prospecciones_idprospecciones: id } });
    if (respuesta) {
        res.json({
            msg: "Relaciones encontradas",
            response: respuesta
        });
    }
    else {
        res.status(404).json({
            msg: `No existe una prospeccionesCotizaciones con ese id ${id}`
        });
    }
});
exports.getByprospecciones_idprospecciones = getByprospecciones_idprospecciones;
const deleteprospeccionesCotizaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield prospeccionesCotizaciones_1.default.findByPk(id);
    if (!respuesta) {
        res.status(404).json({
            msg: `No se encontro ningun prospeccionesCotizaciones con id ${id}`
        });
    }
    else {
        yield prospeccionesCotizaciones_1.default.destroy();
        res.json({
            msg: `El prospeccionesCotizaciones fue eliminado con exito!`
        });
    }
});
exports.deleteprospeccionesCotizaciones = deleteprospeccionesCotizaciones;
const postprospeccionesCotizaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield prospeccionesCotizaciones_1.default.create(body);
    res.json({
        msg: 'El prospeccionesCotizaciones se agrego con exito!'
    });
});
exports.postprospeccionesCotizaciones = postprospeccionesCotizaciones;
const updateprospeccionesCotizaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const respuesta = yield prospeccionesCotizaciones_1.default.findByPk(id);
    if (respuesta) {
        yield respuesta.update(body);
        res.json({
            msg: 'El prospeccionesCotizaciones se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun prospeccionesCotizaciones con id ${id}`
        });
    }
});
exports.updateprospeccionesCotizaciones = updateprospeccionesCotizaciones;
