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
exports.updatePermuser = exports.postPermuser = exports.deletePermuser = exports.getPermuserIds = exports.getPermuser = exports.getAllPermuser = void 0;
const permusuario_1 = __importDefault(require("../models/permusuario"));
const permiso_1 = __importDefault(require("../models/permiso"));
const sequelize_1 = require("sequelize");
const getAllPermuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    try {
        const permisos_user = yield permusuario_1.default.findAll({ where: { id_usuario: id_usuario } });
        let permisos; // Declara la variable permisos aquí
        if (permisos_user.length > 0) {
            permisos = yield permiso_1.default.findAll({
                where: {
                    id: {
                        [sequelize_1.Op.notIn]: permisos_user.map((permiso) => permiso.get('id_permiso'))
                    }
                }
            });
        }
        else {
            permisos = yield permiso_1.default.findAll();
        }
        res.json(permisos);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ocurrió un error al obtener los permisos',
        });
    }
});
exports.getAllPermuser = getAllPermuser;
const getPermuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const permiso = yield permusuario_1.default.findAll({ where: { id_usuario: id_usuario } });
    if (permiso) {
        res.json(permiso);
    }
    else {
        res.status(404).json({
            msg: `No existe un permiso con ese id ${id_usuario}`
        });
    }
});
exports.getPermuser = getPermuser;
const getPermuserIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const permisos = yield permusuario_1.default.findAll({ where: { id_usuario: id_usuario } });
    if (permisos.length > 0) {
        const permisosIds = permisos.map((permiso) => permiso.getDataValue('id_permiso'));
        res.json(permisosIds);
    }
    else {
        res.status(404).json({
            msg: `No existe un permiso con ese id ${id_usuario}`
        });
    }
});
exports.getPermuserIds = getPermuserIds;
const deletePermuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const permiso = yield permusuario_1.default.findByPk(id);
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
exports.deletePermuser = deletePermuser;
const postPermuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield permusuario_1.default.create(body);
    res.json({
        msg: 'El permiso se agrego con exito!'
    });
});
exports.postPermuser = postPermuser;
const updatePermuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const permiso = yield permusuario_1.default.findByPk(id);
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
exports.updatePermuser = updatePermuser;
