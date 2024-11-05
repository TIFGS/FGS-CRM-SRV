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
exports.updateplanta = exports.postplanta = exports.deleteplanta = exports.getBymarca_idmarca = exports.getById = exports.getAll = void 0;
const planta_1 = __importDefault(require("../models/planta"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield planta_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield planta_1.default.findByPk(id);
    if (respuesta) {
        res.json(respuesta);
    }
    else {
        res.status(404).json({
            msg: `No existe una planta con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getBymarca_idmarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield planta_1.default.findAll({ where: { marca_idmarca: id } });
    if (respuesta) {
        res.json(respuesta);
    }
    else {
        res.status(404).json({
            msg: `No existe una planta con ese id ${id}`
        });
    }
});
exports.getBymarca_idmarca = getBymarca_idmarca;
const deleteplanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield planta_1.default.findByPk(id);
    if (!respuesta) {
        res.status(404).json({
            msg: `No se encontro ningun planta con id ${id}`
        });
    }
    else {
        yield planta_1.default.destroy();
        res.json({
            msg: `El planta fue eliminado con exito!`
        });
    }
});
exports.deleteplanta = deleteplanta;
const postplanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let resultado = yield planta_1.default.create(body);
    res.json({
        msg: 'El planta se agrego con exito!',
        obj: resultado,
    });
});
exports.postplanta = postplanta;
const updateplanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const respuesta = yield planta_1.default.findByPk(id);
    if (respuesta) {
        let resultado = yield respuesta.update(body);
        res.json({
            msg: 'El planta se actualizo con exito!',
            obj: resultado,
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun planta con id ${id}`
        });
    }
});
exports.updateplanta = updateplanta;
