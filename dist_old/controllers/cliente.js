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
exports.updateCliente = exports.postCliente = exports.deleteCliente = exports.getById = exports.getAll = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield cliente_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cliente = yield cliente_1.default.findByPk(id);
    if (cliente) {
        res.json(cliente);
    }
    else {
        res.status(404).json({
            msg: `No existe una cliente con ese id ${id}`
        });
    }
});
exports.getById = getById;
/*export const getByclientePlanta_idclientePlanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const cliente =await Cliente.findAll({where:{clientePlanta_idclientePlanta:id}});
    if(cliente){
        res.json(cliente);
    }else{
        res.status(404).json({
            msg: `No existe una cliente con ese id ${id}`
        });
    }
}*/
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cliente = yield cliente_1.default.findByPk(id);
    if (!cliente) {
        res.status(404).json({
            msg: `No se encontro ningun cliente con id ${id}`
        });
    }
    else {
        yield cliente.destroy();
        res.json({
            msg: `El cliente fue eliminado con exito!`
        });
    }
});
exports.deleteCliente = deleteCliente;
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const guardado = yield cliente_1.default.create(body);
    res.json({
        msg: 'El cliente se agrego con exito!',
        obj: JSON.stringify(guardado),
    });
});
exports.postCliente = postCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const cliente = yield cliente_1.default.findByPk(id);
    if (cliente) {
        yield cliente.update(body);
        res.json({
            msg: 'El cliente se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun cliente con id ${id}`
        });
    }
});
exports.updateCliente = updateCliente;
/*export const getResumen = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const alta_list = await Alta.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (alta_list.length > 0) {
      const altas = alta_list.map((alta) => alta.getDataValue('probabilidad'));
      resumen[0] = altas.filter((probabilidad) => probabilidad === 0).length;
      resumen[1] = altas.filter((probabilidad) => probabilidad === 1).length;
      resumen[2] = altas.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
    
};*/ 
