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
exports.update = exports.post = exports.del = exports.getByIdDoc = exports.getById = exports.getAll = void 0;
const oportunidadActividad_1 = __importDefault(require("../models/oportunidadActividad"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield oportunidadActividad_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resp = yield oportunidadActividad_1.default.findByPk(id);
    if (resp) {
        res.json(resp);
    }
    else {
        res.status(404).json({
            msg: `No existe un historico con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getByIdDoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resp = yield oportunidadActividad_1.default.findAll({ where: { oportunidades_idoportunidades: id } });
    if (resp) {
        res.json(resp);
    }
    else {
        res.status(404).json({
            msg: `No existe un historico con ese id ${id}`
        });
    }
});
exports.getByIdDoc = getByIdDoc;
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resp = yield oportunidadActividad_1.default.findByPk(id);
    if (!resp) {
        res.status(404).json({
            msg: `No se encontro ningun permiso con id ${id}`
        });
    }
    else {
        yield oportunidadActividad_1.default.destroy();
        res.json({
            msg: `El permiso fue eliminado con exito!`
        });
    }
});
exports.del = del;
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    /*res.json({
        msg:`Body:`+JSON.stringify(body)
    });*/
    const resp = yield oportunidadActividad_1.default.create(body);
    if (resp) {
        res.json({
            msg: 'el historico se creo con exito!:'
        });
    }
    else {
        res.status(404).json({
            msg: `No se guardo la actividad ${resp}`
        });
    }
});
exports.post = post;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const resp = yield oportunidadActividad_1.default.findByPk(id);
    if (resp) {
        yield resp.update(body);
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
exports.update = update;
