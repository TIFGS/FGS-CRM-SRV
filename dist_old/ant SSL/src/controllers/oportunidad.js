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
exports.getResumen = exports.updateOportunidad = exports.postOportunidad = exports.deleteOportunidad = exports.getById = exports.getAll = void 0;
const oportunidad_1 = __importDefault(require("../models/oportunidad"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield oportunidad_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oportunidad = yield oportunidad_1.default.findByPk(id);
    if (oportunidad)
        res.json(oportunidad);
    else {
        res.status(404).json({
            msg: `No existe una oportunidad con ese id ${id}`
        });
    }
});
exports.getById = getById;
const deleteOportunidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oportunidad = yield oportunidad_1.default.findByPk(id);
    if (!oportunidad) {
        res.status(404).json({
            msg: `No se encontro ninguna oportunidad con id ${id}`
        });
    }
    else {
        yield oportunidad.destroy();
        res.json({
            msg: `La oportunidad fue eliminada con exito!`
        });
    }
});
exports.deleteOportunidad = deleteOportunidad;
const postOportunidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield oportunidad_1.default.create(body);
    res.json({
        msg: 'La oportunidad se agrego con exito!'
    });
});
exports.postOportunidad = postOportunidad;
const updateOportunidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const oportunidad = yield oportunidad_1.default.findByPk(id);
    if (oportunidad) {
        yield oportunidad.update(body);
        res.json({
            msg: 'La oportunidad se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun oportunidad con id ${id}`
        });
    }
});
exports.updateOportunidad = updateOportunidad;
const getResumen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const oportunidad_list = yield oportunidad_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (oportunidad_list.length > 0) {
        const cotizaciones = oportunidad_list.map((item) => item.getDataValue('probabilidad'));
        resumen[0] = cotizaciones.filter((probabilidad) => probabilidad === 0).length;
        resumen[1] = cotizaciones.filter((probabilidad) => probabilidad === 1).length;
        resumen[2] = cotizaciones.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
});
exports.getResumen = getResumen;
