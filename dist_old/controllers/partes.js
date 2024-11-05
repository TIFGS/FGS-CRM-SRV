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
exports.updateparte = exports.comprobarparte = exports.postparte = exports.deleteparte = exports.getById = exports.getAll = void 0;
const luxon_1 = require("luxon");
const partes_1 = __importDefault(require("../models/partes"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield partes_1.default.findAll();
    /*let list = {
        prueba1:"prueba"
    };*/
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const partes = yield partes_1.default.findByPk(id);
    if (partes) {
        res.json(partes);
    }
    else {
        res.status(404).json({
            msg: `No existe una parte con ese id ${id}`
        });
    }
});
exports.getById = getById;
const deleteparte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const partes = yield partes_1.default.findByPk(id);
    if (!partes) {
        res.status(404).json({
            msg: `No se encontro ninguna parte con id ${id}`
        });
    }
    else {
        yield partes_1.default.destroy();
        res.json({
            msg: `la parte fue eliminado con exito!`
        });
    }
});
exports.deleteparte = deleteparte;
const postparte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        let respuesta = yield partes_1.default.create(body);
        res.json({
            msg: 'la parte se creo con exito!',
            parte: respuesta
        });
    }
    catch (error) {
        console.error("Fecha Error", obtenerFechaActualMX());
        console.error("Error al guardar el articulo", error, body);
        res.status(404).json({ msg: "Error al guardar el articulo", error: error, body: body });
    }
});
exports.postparte = postparte;
const comprobarparte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const busqueda = yield partes_1.default.findAll({ where: { nombre: body["nombre"] } });
    //res.json(partes);
    if (busqueda.length > 0) {
        res.json(busqueda);
    }
    else {
        let respuesta = [yield partes_1.default.create(body)];
        res.json(respuesta);
    }
});
exports.comprobarparte = comprobarparte;
const updateparte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const partes = yield partes_1.default.findByPk(id);
    if (partes) {
        yield partes.update(body);
        res.json({
            msg: 'la parte se actualizo con exito!'
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ninguna parte con id ${id}`
        });
    }
});
exports.updateparte = updateparte;
function obtenerFechaActualMX() {
    const mexicoCity = luxon_1.DateTime.now().setZone('America/Mexico_City');
    return mexicoCity.toFormat('yyyy-LL-dd HH:mm:ss');
}
