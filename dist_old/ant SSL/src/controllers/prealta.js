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
exports.getResumen = exports.updatePrealta = exports.postPrealta = exports.deletePrealta = exports.getById = exports.getAll = void 0;
const prealta_1 = __importDefault(require("../models/prealta"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield prealta_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prealta = yield prealta_1.default.findByPk(id);
    if (prealta) {
        res.json(prealta);
    }
    else {
        res.status(404).json({
            msg: `No existe una prealta con ese id ${id}`
        });
    }
});
exports.getById = getById;
const deletePrealta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prealta = yield prealta_1.default.findByPk(id);
    if (!prealta) {
        res.status(404).json({
            msg: `No se encontro ninguna prealta con id ${id}`
        });
    }
    else {
        yield prealta.destroy();
        res.json({
            msg: `La prealta fue eliminada con exito!`
        });
    }
});
exports.deletePrealta = deletePrealta;
const postPrealta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield prealta_1.default.create(body);
    res.json({
        msg: 'La prealta se agrego con exito!'
    });
});
exports.postPrealta = postPrealta;
const updatePrealta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const prealta = yield prealta_1.default.findByPk(id);
    if (prealta) {
        yield prealta.update(body);
        res.json({
            msg: 'La prealta se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ninguna prealta con id ${id}`
        });
    }
});
exports.updatePrealta = updatePrealta;
const getResumen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const prealta_list = yield prealta_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (prealta_list.length > 0) {
        const altas = prealta_list.map((item) => item.getDataValue('probabilidad'));
        resumen[0] = altas.filter((probabilidad) => probabilidad === 0).length;
        resumen[1] = altas.filter((probabilidad) => probabilidad === 1).length;
        resumen[2] = altas.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
});
exports.getResumen = getResumen;
