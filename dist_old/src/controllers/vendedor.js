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
exports.updatevendedor = exports.postvendedor = exports.deletevendedor = exports.getByIdDependencias = exports.getAllDependencias = exports.getById = exports.getAll = void 0;
const vendedor_1 = __importDefault(require("../models/vendedor"));
const clientePlanta_1 = __importDefault(require("../models/clientePlanta"));
const planta_1 = __importDefault(require("../models/planta"));
const cliente_1 = __importDefault(require("../models/cliente"));
const marca_1 = __importDefault(require("../models/marca"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield vendedor_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield vendedor_1.default.findByPk(id);
    if (respuesta) {
        res.json(respuesta);
    }
    else {
        res.status(404).json({
            msg: `No existe una vendedor con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getAllDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield vendedor_1.default.findAll({
        include: [
            {
                model: clientePlanta_1.default,
                as: 'clientePlanta',
                include: [
                    {
                        model: planta_1.default,
                        as: 'planta',
                        include: [
                            {
                                model: marca_1.default,
                                as: 'marca',
                            }
                        ],
                    },
                    {
                        model: cliente_1.default,
                        as: 'cliente',
                    },
                    {
                        model: vendedor_1.default,
                        as: 'vendedor',
                    },
                    {
                        model: vendedor_1.default,
                        as: 'vendedorRef'
                    }
                ],
            },
        ]
    });
    res.json(list);
});
exports.getAllDependencias = getAllDependencias;
const getByIdDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield vendedor_1.default.findByPk(id, {
        include: [
            {
                model: clientePlanta_1.default,
                as: 'clientePlanta',
                include: [
                    {
                        model: planta_1.default,
                        as: 'planta',
                        include: [
                            {
                                model: marca_1.default,
                                as: 'marca',
                            }
                        ],
                    },
                    {
                        model: cliente_1.default,
                        as: 'cliente',
                    },
                    {
                        model: vendedor_1.default,
                        as: 'vendedor',
                    },
                    {
                        model: vendedor_1.default,
                        as: 'vendedorRef'
                    }
                ],
            },
        ]
    });
    if (respuesta) {
        res.json(respuesta);
    }
    else {
        res.status(404).json({
            msg: `No existe una vendedor con ese id ${id}`
        });
    }
});
exports.getByIdDependencias = getByIdDependencias;
/*export const getBymarca_idmarca = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await vendedor.findAll({where:{marca_idmarca:id}});
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una vendedor con ese id ${id}`
        });
    }
}*/
const deletevendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const respuesta = yield vendedor_1.default.findByPk(id);
    if (!respuesta) {
        res.status(404).json({
            msg: `No se encontro ningun vendedor con id ${id}`
        });
    }
    else {
        yield vendedor_1.default.destroy();
        res.json({
            msg: `El vendedor fue eliminado con exito!`
        });
    }
});
exports.deletevendedor = deletevendedor;
const postvendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield vendedor_1.default.create(body);
    res.json({
        msg: 'El vendedor se agrego con exito!'
    });
});
exports.postvendedor = postvendedor;
const updatevendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const respuesta = yield vendedor_1.default.findByPk(id);
    if (respuesta) {
        yield respuesta.update(body);
        res.json({
            msg: 'El vendedor se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun vendedor con id ${id}`
        });
    }
});
exports.updatevendedor = updatevendedor;
