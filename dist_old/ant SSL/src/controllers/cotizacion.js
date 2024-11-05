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
exports.getResumen = exports.updateCotizacion = exports.postCotizacion = exports.deleteCotizacion = exports.getById = exports.getAll = void 0;
const cotizacion_1 = __importDefault(require("../models/cotizacion"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield cotizacion_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cotizacion = yield cotizacion_1.default.findByPk(id);
    if (cotizacion) {
        res.json(cotizacion);
    }
    else {
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
});
exports.getById = getById;
const deleteCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cotizacion = yield cotizacion_1.default.findByPk(id);
    if (!cotizacion) {
        res.status(404).json({
            msg: `No se encontro ningun permiso con id ${id}`
        });
    }
    else {
        yield cotizacion.destroy();
        res.json({
            msg: `El permiso fue eliminado con exito!`
        });
    }
});
exports.deleteCotizacion = deleteCotizacion;
const postCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield cotizacion_1.default.create(body);
    res.json({
        msg: 'El permiso se agrego con exito!'
    });
});
exports.postCotizacion = postCotizacion;
const updateCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const cotizacion = yield cotizacion_1.default.findByPk(id);
    if (cotizacion) {
        yield cotizacion.update(body);
        res.json({
            msg: 'El permiso se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun permiso con id ${id}`
        });
    }
});
exports.updateCotizacion = updateCotizacion;
const getResumen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const cotizacion_list = yield cotizacion_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (cotizacion_list.length > 0) {
        const cotizaciones = cotizacion_list.map((alta) => alta.getDataValue('probabilidad'));
        resumen[0] = cotizaciones.filter((probabilidad) => probabilidad === 0).length;
        resumen[1] = cotizaciones.filter((probabilidad) => probabilidad === 1).length;
        resumen[2] = cotizaciones.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
});
exports.getResumen = getResumen;
