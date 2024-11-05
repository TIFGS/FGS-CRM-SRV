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
exports.updateArea = exports.postArea = exports.deleteArea = exports.getByplanta_idplanta = exports.getById = exports.getGroupByNombre = exports.getAll = void 0;
const area_1 = __importDefault(require("../models/area"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield area_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getGroupByNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield area_1.default.findAll({ group: 'nombre' });
    res.json(list);
});
exports.getGroupByNombre = getGroupByNombre;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const area = yield area_1.default.findByPk(id);
    if (area) {
        res.json(area);
    }
    else {
        res.status(404).json({
            msg: `No existe una area con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getByplanta_idplanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const area = yield area_1.default.findAll({ where: { planta_idplanta: id } });
    if (area && JSON.stringify(area) !== "[]") {
        res.json(area);
    }
    else {
        if (!area) {
            res.status(404).json({
                msg: `No existe una area con ese id ${id}`
            });
        }
        else {
            res.status(200).json({
                msg: `No existe una area con ese id ${id}`
            });
        }
    }
});
exports.getByplanta_idplanta = getByplanta_idplanta;
const deleteArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const area = yield area_1.default.findByPk(id);
    if (!area) {
        res.status(404).json({
            msg: `No se encontro ningun area con id ${id}`
        });
    }
    else {
        yield area.destroy();
        res.json({
            msg: `El area fue eliminado con exito!`
        });
    }
});
exports.deleteArea = deleteArea;
const postArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const guardado = yield area_1.default.create(body);
    res.json({
        msg: 'El area se agrego con exito!',
        obj: JSON.stringify(guardado),
    });
});
exports.postArea = postArea;
const updateArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const area = yield area_1.default.findByPk(id);
    if (area) {
        const resultado = yield area.update(body);
        res.json({
            msg: 'El area se actualizo con exito!',
            obj: resultado,
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun area con id ${id}`
        });
    }
});
exports.updateArea = updateArea;
