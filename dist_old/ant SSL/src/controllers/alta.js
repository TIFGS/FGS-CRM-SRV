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
exports.getResumen = exports.updateAlta = exports.postAlta = exports.deleteAlta = exports.getById = exports.getAll = void 0;
const alta_1 = __importDefault(require("../models/alta"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield alta_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alta = yield alta_1.default.findByPk(id);
    if (alta) {
        res.json(alta);
    }
    else {
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
});
exports.getById = getById;
const deleteAlta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alta = yield alta_1.default.findByPk(id);
    if (!alta) {
        res.status(404).json({
            msg: `No se encontro ningun permiso con id ${id}`
        });
    }
    else {
        yield alta.destroy();
        res.json({
            msg: `El permiso fue eliminado con exito!`
        });
    }
});
exports.deleteAlta = deleteAlta;
const postAlta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield alta_1.default.create(body);
    res.json({
        msg: 'El permiso se agrego con exito!'
    });
});
exports.postAlta = postAlta;
const updateAlta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const alta = yield alta_1.default.findByPk(id);
    if (alta) {
        yield alta.update(body);
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
exports.updateAlta = updateAlta;
const getResumen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const alta_list = yield alta_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (alta_list.length > 0) {
        const altas = alta_list.map((alta) => alta.getDataValue('probabilidad'));
        resumen[0] = altas.filter((probabilidad) => probabilidad === 0).length;
        resumen[1] = altas.filter((probabilidad) => probabilidad === 1).length;
        resumen[2] = altas.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
});
exports.getResumen = getResumen;
