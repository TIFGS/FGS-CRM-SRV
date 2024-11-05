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
exports.updateoportunidadesProspecciones = exports.postoportunidadesProspecciones = exports.deleteoportunidadesProspecciones = exports.getByoportunidades_idoportunidades = exports.getByprospecciones_idprospecciones = exports.getById = exports.getAll = void 0;
const oportunidadesProspecciones_1 = __importDefault(require("../models/oportunidadesProspecciones"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield oportunidadesProspecciones_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield oportunidadesProspecciones_1.default.findByPk(id);
    if (respuesta) {
        res.json(respuesta);
    }
    else {
        res.status(404).json({
            msg: `No existe una oportunidadesProspecciones con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getByprospecciones_idprospecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield oportunidadesProspecciones_1.default.findAll({ where: { prospecciones_idprospecciones: id } });
    if (respuesta) {
        res.json({
            msg: "Relaciones encontradas",
            response: respuesta
        });
    }
    else {
        res.status(404).json({
            msg: `No existe una oportunidadesProspecciones con ese id ${id}`
        });
    }
});
exports.getByprospecciones_idprospecciones = getByprospecciones_idprospecciones;
const getByoportunidades_idoportunidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield oportunidadesProspecciones_1.default.findAll({ where: { oportunidades_idoportunidades: id } });
    if (respuesta) {
        res.json({
            msg: "Relaciones encontradas",
            response: respuesta
        });
    }
    else {
        res.status(404).json({
            msg: `No existe una oportunidadesProspecciones con ese id ${id}`
        });
    }
});
exports.getByoportunidades_idoportunidades = getByoportunidades_idoportunidades;
const deleteoportunidadesProspecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield oportunidadesProspecciones_1.default.findByPk(id);
    if (!respuesta) {
        res.status(404).json({
            msg: `No se encontro ningun oportunidadesProspecciones con id ${id}`
        });
    }
    else {
        yield oportunidadesProspecciones_1.default.destroy();
        res.json({
            msg: `El oportunidadesProspecciones fue eliminado con exito!`
        });
    }
});
exports.deleteoportunidadesProspecciones = deleteoportunidadesProspecciones;
const postoportunidadesProspecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield oportunidadesProspecciones_1.default.create(body);
    res.json({
        msg: 'El oportunidadesProspecciones se agrego con exito!'
    });
});
exports.postoportunidadesProspecciones = postoportunidadesProspecciones;
const updateoportunidadesProspecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const respuesta = yield oportunidadesProspecciones_1.default.findByPk(id);
    if (respuesta) {
        yield respuesta.update(body);
        res.json({
            msg: 'El oportunidadesProspecciones se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun oportunidadesProspecciones con id ${id}`
        });
    }
});
exports.updateoportunidadesProspecciones = updateoportunidadesProspecciones;
