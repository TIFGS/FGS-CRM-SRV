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
exports.getResumen = exports.updatePrealta = exports.postPrealtaDependencias = exports.postPrealta = exports.deletePrealta = exports.getByclientePlanta_idclientePlanta = exports.getByIdDependencias = exports.getById = exports.getAllDependencias = exports.getAll = void 0;
const luxon_1 = require("luxon");
const prealta_1 = __importDefault(require("../models/prealta"));
const clientePlanta_1 = __importDefault(require("../models/clientePlanta"));
const planta_1 = __importDefault(require("../models/planta"));
const cliente_1 = __importDefault(require("../models/cliente"));
const vendedor_1 = __importDefault(require("../models/vendedor"));
const partes_1 = __importDefault(require("../models/partes"));
const prealtaHistorico_1 = __importDefault(require("../models/prealtaHistorico"));
const prealtaActividad_1 = __importDefault(require("../models/prealtaActividad"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield prealta_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getAllDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield prealta_1.default.findAll({
        order: [['idprealta', 'DESC']],
        include: [
            {
                model: clientePlanta_1.default,
                as: 'clientePlanta',
                include: [
                    {
                        model: planta_1.default,
                        as: 'planta',
                    },
                    {
                        model: cliente_1.default,
                        as: 'cliente',
                    },
                    {
                        model: vendedor_1.default,
                        as: 'vendedor',
                    },
                ],
            },
            {
                model: prealtaHistorico_1.default,
                as: 'historicosPrealta',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: prealtaActividad_1.default,
                as: 'actividadesPrealta',
            },
        ],
    });
    res.json(list);
});
exports.getAllDependencias = getAllDependencias;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prealta = yield prealta_1.default.findByPk(id);
    if (prealta) {
        res.json(prealta);
    }
    else {
        res.status(404).json({
            msg: `No existe una prealta con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getByIdDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prealta = yield prealta_1.default.findByPk(id, {
        order: [['idprealta', 'DESC']],
        include: [
            {
                model: clientePlanta_1.default,
                as: 'clientePlanta',
                include: [
                    {
                        model: planta_1.default,
                        as: 'planta',
                    },
                    {
                        model: cliente_1.default,
                        as: 'cliente',
                    },
                    {
                        model: vendedor_1.default,
                        as: 'vendedor',
                    },
                ],
            },
            {
                model: prealtaHistorico_1.default,
                as: 'historicosPrealta',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: prealtaActividad_1.default,
                as: 'actividadesPrealta',
            },
        ],
    });
    if (prealta) {
        res.json(prealta);
    }
    else {
        res.status(404).json({
            msg: `No existe una prealta con ese id ${id}`
        });
    }
});
exports.getByIdDependencias = getByIdDependencias;
const getByclientePlanta_idclientePlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prealta = yield prealta_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (prealta) {
        res.json(prealta);
    }
    else {
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
});
exports.getByclientePlanta_idclientePlanta = getByclientePlanta_idclientePlanta;
const deletePrealta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prealta = yield prealta_1.default.findByPk(id);
    if (!prealta) {
        res.status(404).json({
            msg: `No se encontro ninguna prealta con id ${id}`
        });
    }
    else {
        yield prealta.destroy();
        res.json({
            msg: `La prealta fue eliminada con exito!`
        });
    }
});
exports.deletePrealta = deletePrealta;
const postPrealta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const prealta = yield prealta_1.default.create(body);
    res.json({
        response: prealta,
        msg: 'La prealta se agrego con exito!'
    });
});
exports.postPrealta = postPrealta;
const postPrealtaDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let condGuardado = true, logGuardado = [];
    const { body } = req;
    let idD = -1;
    if (body.idprealta != null) {
        const doc = yield prealta_1.default.findByPk(body.idprealta).finally();
        if (doc != null) {
            try {
                const update = yield doc.update(body).finally();
                //console.log("Respuesta",update);
                if (update) {
                    idD = update.getDataValue('idprealta');
                    logGuardado.push("Prealta actualizada con exito");
                }
                else {
                    condGuardado = false;
                    logGuardado.push("Error en actualizar al actualiza la Prealta" + body.idprealta + "\n");
                }
                idD = update.getDataValue('idprealta');
            }
            catch (error) {
                console.log("Error al actualizar la Prealta" + obtenerFechaActualMX(), error);
                condGuardado = false;
                logGuardado.push("Error en actualizar al actualiza la Prealta" + body.idprealta + " error: " + JSON.stringify(error) + "\n");
            }
        }
        else {
            condGuardado = false;
            logGuardado.push("Error en actualizar al obtener la Prealta" + body.idprealta + "\n");
        }
    }
    else {
        const doc = yield prealta_1.default.build(body, {
            include: [
                {
                    model: clientePlanta_1.default,
                    as: 'clientePlanta',
                    include: [
                        {
                            model: planta_1.default,
                            as: 'planta',
                        },
                        {
                            model: cliente_1.default,
                            as: 'cliente',
                        },
                        {
                            model: vendedor_1.default,
                            as: 'vendedor',
                        },
                    ],
                },
                {
                    model: prealtaHistorico_1.default,
                    as: 'historicosPrealta',
                },
                {
                    model: prealtaActividad_1.default,
                    as: 'actividadesPrealta',
                },
            ]
        });
        try {
            let respuesta = yield doc.save().finally();
            if (respuesta) {
                idD = respuesta.getDataValue('idprealta');
                logGuardado.push("Prealta creada con exito " + idD);
            }
            else {
                condGuardado = false;
                logGuardado.push("Error al guardar la Prealta" + body.idprealta + "\n");
            }
            //console.log("respuesta",respuesta);            
        }
        catch (error) {
            console.error("Error al guardar la Prealta " + obtenerFechaActualMX(), error);
            logGuardado.push("Error al guardar la Prealta " + body.idprealta + " error:" + error + "\n");
            condGuardado = false;
        }
        idD = doc.getDataValue('idprealta');
    }
    if (condGuardado) {
        for (let i = 0; i < Object.keys(body.historicosPrealta).length; i++) {
            if (body.historicosPrealta[i].idhistoricosPrealta != null) {
                const historico = yield prealtaHistorico_1.default.findByPk(body.historicosPrealta[i].idhistoricosPrealta);
                if (historico) {
                    try {
                        yield historico.update(body.historicosPrealta[i]);
                        if (historico) {
                            logGuardado.push("Historico actualizado con exito " + body.historicosPrealta[i].idhistoricosPrealta);
                        }
                        else {
                            logGuardado.push("Error al actualizar el historico " + body.historicosPrealta[i].idhistoricosPrealta + "\n");
                        }
                    }
                    catch (error) {
                        console.log("Error al actualizar el historico " + obtenerFechaActualMX(), error);
                        logGuardado.push("Error al actualizar el historico " + body.historicosPrealta[i].idhistoricosPrealta + " error:" + error + "\n");
                    }
                }
                else {
                    logGuardado.push("Error al actualizar el historico " + body.historicosPrealta[i].idhistoricosPrealta + " no existe\n");
                }
            }
            else {
                let historico = Object.assign(Object.assign({}, body.historicosPrealta[i]), { prealta_idprealta: idD });
                try {
                    const respuesta = yield prealtaHistorico_1.default.create(historico);
                    if (respuesta) {
                        /**Ah segun no existe idhistoricosPrealta en respuesta*/
                        logGuardado.push("Historico creado con exito " + respuesta.getDataValue('idhistoricosPrealta'));
                    }
                    else {
                        logGuardado.push("Error al crear el historico " + i + "\n");
                    }
                }
                catch (error) {
                    console.log("Error al crear el historico" + obtenerFechaActualMX(), error);
                    logGuardado.push("Error al crear el historico " + i + " error:" + error + "\n");
                }
            }
        }
        for (let i = 0; i < Object.keys(body.actividadPrealta).length; i++) {
            if (body.actividadPrealta[i].idactividadesPrealta != null) {
                const actividad = yield prealtaActividad_1.default.findByPk(body.actividadPrealta[i].idactividadesPrealta);
                if (actividad) {
                    try {
                        yield actividad.update(body.actividadPrealta[i]);
                        logGuardado.push("Actividad actualizada con exito " + body.actividadPrealta[i].idactividadesPrealta);
                    }
                    catch (error) {
                        console.log("Error al actualizar la actividad", error);
                        logGuardado.push("Error al actualizar la actividad " + body.actividadPrealta[i].idactividadesPrealta + " error:" + error + "\n");
                    }
                }
                else {
                    logGuardado.push("Error al actualizar la actividad " + body.actividadPrealta[i].idactividadesPrealta + " no existe\n");
                }
            }
            else {
                let actividad = Object.assign(Object.assign({}, body.actividadPrealta[i]), { prealta_idprealta: idD });
                try {
                    const respuesta = yield prealtaActividad_1.default.create(actividad);
                    if (respuesta) {
                        /**Ah segun no existe idactividadesPrealta en respuesta*/
                        logGuardado.push("Actividad creada con exito " + respuesta.getDataValue('idactividadesPrealta'));
                        //console.log("Actividad creada con exito " , respuesta);
                    }
                    else {
                        logGuardado.push("Error al crear la actividad " + i + "\n");
                    }
                }
                catch (error) {
                    console.log("Error al crear la actividad", error);
                    logGuardado.push("Error al crear la actividad " + i + " error:" + error + "\n");
                }
            }
        }
    }
    else {
        logGuardado.push("No se relizaron cambios en la Prealta\n");
    }
    const docDB = yield prealta_1.default.findByPk(idD, {
        include: [
            {
                model: clientePlanta_1.default,
                as: 'clientePlanta',
                include: [
                    {
                        model: planta_1.default,
                        as: 'planta',
                    },
                    {
                        model: cliente_1.default,
                        as: 'cliente',
                    },
                    {
                        model: vendedor_1.default,
                        as: 'vendedor',
                    },
                ],
            },
            {
                model: prealtaHistorico_1.default,
                as: 'historicosPrealta',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: prealtaActividad_1.default,
                as: 'actividadesPrealta',
            },
        ]
    });
    res.json({
        response: docDB,
        msg: logGuardado,
    });
});
exports.postPrealtaDependencias = postPrealtaDependencias;
function obtenerFechaActualMX() {
    const mexicoCity = luxon_1.DateTime.now().setZone('America/Mexico_City');
    return mexicoCity.toFormat('yyyy-LL-dd HH:mm:ss');
}
const updatePrealta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const prealta = yield prealta_1.default.findByPk(id);
    if (prealta) {
        yield prealta.update(body);
        res.json({
            msg: 'La prealta se actualizo con exito!',
            response: prealta
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ninguna prealta con id ${id}`
        });
    }
});
exports.updatePrealta = updatePrealta;
const getResumen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const prealta_list = yield prealta_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (prealta_list.length > 0) {
        const altas = prealta_list.map((item) => item.getDataValue('probabilidad'));
        resumen[0] = altas.filter((probabilidad) => probabilidad === 0).length;
        resumen[1] = altas.filter((probabilidad) => probabilidad === 1).length;
        resumen[2] = altas.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
});
exports.getResumen = getResumen;
