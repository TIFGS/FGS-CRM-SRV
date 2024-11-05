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
exports.updateMarca = exports.postMarca = exports.deleteMarca = exports.getById = exports.getAll = void 0;
const marca_1 = __importDefault(require("../models/marca"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield marca_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const marca = yield marca_1.default.findByPk(id);
    if (marca) {
        res.json(marca);
    }
    else {
        res.status(404).json({
            msg: `No existe una Marca con ese id ${id}`
        });
    }
});
exports.getById = getById;
/*export const getByMarcaPlanta_idMarcaPlanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const Marca =await Marca.findAll({where:{MarcaPlanta_idMarcaPlanta:id}});
    if(Marca){
        res.json(Marca);
    }else{
        res.status(404).json({
            msg: `No existe una Marca con ese id ${id}`
        });
    }
}*/
const deleteMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const marca = yield marca_1.default.findByPk(id);
    if (!marca) {
        res.status(404).json({
            msg: `No se encontro ningun Marca con id ${id}`
        });
    }
    else {
        yield marca.destroy();
        res.json({
            msg: `El Marca fue eliminado con exito!`
        });
    }
});
exports.deleteMarca = deleteMarca;
const postMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const guardado = yield marca_1.default.create(body);
    res.json({
        msg: 'El Marca se agrego con exito!',
        obj: guardado,
    });
});
exports.postMarca = postMarca;
const updateMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const marca = yield marca_1.default.findByPk(id);
    if (marca) {
        yield marca.update(body);
        res.json({
            msg: 'El Marca se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun Marca con id ${id}`
        });
    }
});
exports.updateMarca = updateMarca;
