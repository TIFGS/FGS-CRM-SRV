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
exports.updateprealtaAlta = exports.postprealtaAlta = exports.deleteprealtaAlta = exports.getByprealta_idprealta = exports.getByalta_idalta = exports.getById = exports.getAll = void 0;
const prealtaAlta_1 = __importDefault(require("../models/prealtaAlta"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield prealtaAlta_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield prealtaAlta_1.default.findByPk(id);
    if (respuesta) {
        res.json(respuesta);
    }
    else {
        res.status(404).json({
            msg: `No existe una prealtaAlta con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getByalta_idalta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield prealtaAlta_1.default.findAll({ where: { alta_idalta: id } });
    if (respuesta) {
        res.json({
            msg: "Relaciones encontradas",
            response: respuesta
        });
    }
    else {
        res.status(404).json({
            msg: `No existe una prealtaAlta con ese id ${id}`
        });
    }
});
exports.getByalta_idalta = getByalta_idalta;
const getByprealta_idprealta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield prealtaAlta_1.default.findAll({ where: { prealta_idprealta: id } });
    if (respuesta) {
        res.json({
            msg: "Relaciones encontradas",
            response: respuesta
        });
    }
    else {
        res.status(404).json({
            msg: `No existe una prealtaAlta con ese id ${id}`
        });
    }
});
exports.getByprealta_idprealta = getByprealta_idprealta;
const deleteprealtaAlta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield prealtaAlta_1.default.findByPk(id);
    if (!respuesta) {
        res.status(404).json({
            msg: `No se encontro ningun prealtaAlta con id ${id}`
        });
    }
    else {
        yield prealtaAlta_1.default.destroy();
        res.json({
            msg: `El prealtaAlta fue eliminado con exito!`
        });
    }
});
exports.deleteprealtaAlta = deleteprealtaAlta;
const postprealtaAlta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield prealtaAlta_1.default.create(body);
    res.json({
        msg: 'El prealtaAlta se agrego con exito!'
    });
});
exports.postprealtaAlta = postprealtaAlta;
const updateprealtaAlta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const respuesta = yield prealtaAlta_1.default.findByPk(id);
    if (respuesta) {
        yield respuesta.update(body);
        res.json({
            msg: 'El prealtaAlta se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun prealtaAlta con id ${id}`
        });
    }
});
exports.updateprealtaAlta = updateprealtaAlta;
