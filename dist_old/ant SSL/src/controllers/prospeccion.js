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
exports.getResumen = exports.updateProspeccion = exports.postProspeccion = exports.deleteProspeccion = exports.getById = exports.getAll = void 0;
const prospeccion_1 = __importDefault(require("../models/prospeccion"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield prospeccion_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prospeccion = yield prospeccion_1.default.findByPk(id);
    if (prospeccion) {
        res.json(prospeccion);
    }
    else {
        res.status(404).json({
            msg: `No existe una prospección con ese id ${id}`
        });
    }
});
exports.getById = getById;
const deleteProspeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prospeccion = yield prospeccion_1.default.findByPk(id);
    if (!prospeccion) {
        res.status(404).json({
            msg: `No se encontro ninguna prospección con id ${id}`
        });
    }
    else {
        yield prospeccion.destroy();
        res.json({
            msg: `La prospección fue eliminada con exito!`
        });
    }
});
exports.deleteProspeccion = deleteProspeccion;
const postProspeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield prospeccion_1.default.create(body);
    res.json({
        msg: 'La prospeccion se agrego con exito!'
    });
});
exports.postProspeccion = postProspeccion;
const updateProspeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const prospeccion = yield prospeccion_1.default.findByPk(id);
    if (prospeccion) {
        yield prospeccion.update(body);
        res.json({
            msg: 'La prospección se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ninguna prospeccion con id ${id}`
        });
    }
});
exports.updateProspeccion = updateProspeccion;
const getResumen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const prospeccion_list = yield prospeccion_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (prospeccion_list.length > 0) {
        const altas = prospeccion_list.map((item) => item.getDataValue('probabilidad'));
        resumen[0] = altas.filter((probabilidad) => probabilidad === 0).length;
        resumen[1] = altas.filter((probabilidad) => probabilidad === 1).length;
        resumen[2] = altas.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
});
exports.getResumen = getResumen;
