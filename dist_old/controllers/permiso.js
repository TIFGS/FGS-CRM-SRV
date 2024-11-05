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
exports.updatePermiso = exports.postPermiso = exports.deletePermiso = exports.getPermiso = exports.getAllPermisos = void 0;
const permiso_1 = __importDefault(require("../models/permiso"));
const getAllPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPermisos = yield permiso_1.default.findAll();
    res.json(listPermisos);
});
exports.getAllPermisos = getAllPermisos;
const getPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const permiso = yield permiso_1.default.findByPk(id);
    if (permiso) {
        res.json(permiso);
    }
    else {
        res.status(404).json({
            msg: `No existe un permiso con ese id ${id}`
        });
    }
});
exports.getPermiso = getPermiso;
const deletePermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const permiso = yield permiso_1.default.findByPk(id);
    if (!permiso) {
        res.status(404).json({
            msg: `No se encontro ningun permiso con id ${id}`
        });
    }
    else {
        yield permiso.destroy();
        res.json({
            msg: `El permiso fue eliminado con exito!`
        });
    }
});
exports.deletePermiso = deletePermiso;
const postPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield permiso_1.default.create(body);
    res.json({
        msg: 'El permiso se agrego con exito!'
    });
});
exports.postPermiso = postPermiso;
const updatePermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const permiso = yield permiso_1.default.findByPk(id);
    if (permiso) {
        yield permiso.update(body);
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
exports.updatePermiso = updatePermiso;
