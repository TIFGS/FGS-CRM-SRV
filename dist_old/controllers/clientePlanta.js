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
exports.updateclientePlanta = exports.postclientePlanta = exports.deleteclientePlanta = exports.getByvendedor_idvendedor = exports.getBycliente_idcliente = exports.getByplanta_idplanta = exports.getAllDependecias = exports.getById = exports.getAll = void 0;
const clientePlanta_1 = __importDefault(require("../models/clientePlanta"));
const planta_1 = __importDefault(require("../models/planta"));
const cliente_1 = __importDefault(require("../models/cliente"));
const vendedor_1 = __importDefault(require("../models/vendedor"));
const marca_1 = __importDefault(require("../models/marca"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield clientePlanta_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield clientePlanta_1.default.findByPk(id);
    if (respuesta) {
        res.json(respuesta);
    }
    else {
        res.status(404).json({
            msg: `No existe una clientePlanta con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getAllDependecias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield clientePlanta_1.default.findAll({
        order: [['idclientePlanta', 'DESC']],
        include: [{
                model: planta_1.default,
                as: 'planta',
                include: [{
                        model: marca_1.default
                    }]
            },
            {
                model: cliente_1.default,
                as: 'cliente'
            },
            {
                model: vendedor_1.default,
                as: 'vendedor'
            }],
    });
    res.json(list);
});
exports.getAllDependecias = getAllDependecias;
const getByplanta_idplanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield clientePlanta_1.default.findAll({
        order: [['idclientePlanta', 'DESC']],
        include: [{
                model: planta_1.default,
                as: 'planta',
                include: [{
                        model: marca_1.default
                    }]
            },
            {
                model: cliente_1.default,
                as: 'cliente'
            },
            {
                model: vendedor_1.default,
                as: 'vendedor'
            }],
    });
    if (respuesta) {
        res.json(respuesta);
    }
    else {
        res.status(404).json({
            msg: `No existe una clientePlanta con ese id ${id}`
        });
    }
});
exports.getByplanta_idplanta = getByplanta_idplanta;
const getBycliente_idcliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield clientePlanta_1.default.findAll({
        order: [['idclientePlanta', 'DESC']],
        include: [{
                model: planta_1.default,
                as: 'planta',
                include: [{
                        model: marca_1.default
                    }]
            },
            {
                model: cliente_1.default,
                as: 'cliente'
            },
            {
                model: vendedor_1.default,
                as: 'vendedor'
            }],
    });
    if (respuesta) {
        res.json(respuesta);
    }
    else {
        res.status(404).json({
            msg: `No existe una clientePlanta con ese id ${id}`
        });
    }
});
exports.getBycliente_idcliente = getBycliente_idcliente;
const getByvendedor_idvendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield clientePlanta_1.default.findAll({
        order: [['idclientePlanta', 'DESC']],
        include: [{
                model: planta_1.default,
                as: 'planta',
                include: [{
                        model: marca_1.default
                    }]
            },
            {
                model: cliente_1.default,
                as: 'cliente'
            },
            {
                model: vendedor_1.default,
                as: 'vendedor'
            }],
    });
    if (respuesta) {
        res.json(respuesta);
    }
    else {
        res.status(404).json({
            msg: `No existe una clientePlanta con ese id ${id}`
        });
    }
});
exports.getByvendedor_idvendedor = getByvendedor_idvendedor;
const deleteclientePlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield clientePlanta_1.default.findByPk(id);
    if (!respuesta) {
        res.status(404).json({
            msg: `No se encontro ningun clientePlanta con id ${id}`
        });
    }
    else {
        yield clientePlanta_1.default.destroy();
        res.json({
            msg: `El clientePlanta fue eliminado con exito!`
        });
    }
});
exports.deleteclientePlanta = deleteclientePlanta;
const postclientePlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const buscado = yield clientePlanta_1.default.findAll({ where: [{ planta_idplanta: body.planta_idplanta }, { cliente_idcliente: body.cliente_idcliente }, { vendedor_idvendedor: body.vendedor_idvendedor }] });
    if (Object.keys(buscado).length == 0) {
        const respuesta = yield clientePlanta_1.default.create(body);
        if (respuesta) {
            res.json({
                msg: 'El clientePlanta se creo con exito!',
                obj: respuesta,
            });
        }
        else {
            res.status(404).json({
                msg: `Error al crear clientePlanta con ${body}`,
                obj: respuesta,
            });
        }
    }
    else {
        res.status(200).json({
            msg: `Ya existe una relacion con esos parametros ${body}`,
            obj: buscado,
        });
    }
});
exports.postclientePlanta = postclientePlanta;
const updateclientePlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const respuesta = yield clientePlanta_1.default.findByPk(id);
    if (respuesta && JSON.stringify(respuesta) !== "[]") {
        yield respuesta.update(body);
        res.json({
            msg: 'El clientePlanta se actualizo con exito!',
            obj: respuesta,
        });
    }
    else {
        if (!respuesta) {
            res.status(404).json({
                msg: `No existe una relacion con esos parametros ${body}`,
                obj: [],
            });
        }
        else {
            res.status(200).json({
                msg: `No existe una relacion con esos parametros ${body}`,
                obj: respuesta,
            });
        }
    }
});
exports.updateclientePlanta = updateclientePlanta;
