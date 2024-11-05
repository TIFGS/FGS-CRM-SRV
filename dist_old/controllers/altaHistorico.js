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
exports.getPrecio = exports.updatealtaHistorico = exports.postaltaHistorico = exports.deletealtaHistorico = exports.getByDocumento = exports.getById = exports.getAll = void 0;
const altaHistorico_1 = __importDefault(require("../models/altaHistorico"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield altaHistorico_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const altaHistoricos = yield altaHistorico_1.default.findByPk(id);
    if (altaHistoricos) {
        res.json(altaHistoricos);
    }
    else {
        res.status(404).json({
            msg: `No existe un historico con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getByDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const list = yield altaHistorico_1.default.findAll({ where: { alta_idAlta: id } });
    res.json(list);
});
exports.getByDocumento = getByDocumento;
const deletealtaHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const altaHistoricos = yield altaHistorico_1.default.findByPk(id);
    if (!altaHistoricos) {
        res.status(404).json({
            msg: `No se encontro ningun permiso con id ${id}`
        });
    }
    else {
        yield altaHistorico_1.default.destroy();
        res.json({
            msg: `El permiso fue eliminado con exito!`
        });
    }
});
exports.deletealtaHistorico = deletealtaHistorico;
const postaltaHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let altahistorico = yield altaHistorico_1.default.create(body);
    //let altahistorico = JSON.stringify(body);
    res.json({
        response: altahistorico,
        msg: 'el historico se creo con exito!'
    });
});
exports.postaltaHistorico = postaltaHistorico;
const updatealtaHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const altaHistoricos = yield altaHistorico_1.default.findByPk(id);
    if (altaHistoricos) {
        yield altaHistoricos.update(body);
        res.json({
            msg: 'el historico se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun historico con id ${id}`
        });
    }
});
exports.updatealtaHistorico = updatealtaHistorico;
const getPrecio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    var precio = 0;
    //const maxVersion = await altaHistorico.max('version', { where: { alta_idAlta: id } });
    const cotHist = yield altaHistorico_1.default.findAll({ where: { alta_idAlta: id, version: 1 } });
    cotHist.forEach((cot) => {
        precio += Number(cot.getDataValue('precioTotal'));
    });
    res.json(precio);
});
exports.getPrecio = getPrecio;
