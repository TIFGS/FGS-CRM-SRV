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
exports.getPrecio = exports.updatefacturaHistorico = exports.postfacturaHistorico = exports.deletefacturaHistorico = exports.getByDocumento = exports.getById = exports.getAll = void 0;
const facturaHistorico_1 = __importDefault(require("../models/facturaHistorico"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield facturaHistorico_1.default.findAll();
    /*let list = {
        prueba1:"prueba"
    };*/
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const facturaHistoricos = yield facturaHistorico_1.default.findByPk(id);
    if (facturaHistoricos) {
        res.json(facturaHistoricos);
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
    const list = yield facturaHistorico_1.default.findAll({ where: { factura_idfactura: id } });
    res.json(list);
});
exports.getByDocumento = getByDocumento;
const deletefacturaHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const facturaHistoricos = yield facturaHistorico_1.default.findByPk(id);
    if (!facturaHistoricos) {
        res.status(404).json({
            msg: `No se encontro ningun permiso con id ${id}`
        });
    }
    else {
        yield facturaHistorico_1.default.destroy();
        res.json({
            msg: `El permiso fue eliminado con exito!`
        });
    }
});
exports.deletefacturaHistorico = deletefacturaHistorico;
const postfacturaHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield facturaHistorico_1.default.create(body);
    res.json({
        msg: 'el historico se creo con exito!'
    });
});
exports.postfacturaHistorico = postfacturaHistorico;
const updatefacturaHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const facturaHistoricos = yield facturaHistorico_1.default.findByPk(id);
    if (facturaHistoricos) {
        yield facturaHistoricos.update(body);
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
exports.updatefacturaHistorico = updatefacturaHistorico;
const getPrecio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    var precio = 0;
    const maxVersion = yield facturaHistorico_1.default.max('version', { where: { factura_idfactura: id } });
    const cotHist = yield facturaHistorico_1.default.findAll({ where: { factura_idfactura: id, version: maxVersion } });
    cotHist.forEach((cot) => {
        precio += Number(cot.getDataValue('precioTotal'));
    });
    res.json(precio);
});
exports.getPrecio = getPrecio;
