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
exports.getResumen = exports.updateAlta = exports.postAltaDependencias = exports.postAlta = exports.deleteAlta = exports.getByclientePlanta_idclientePlanta = exports.getPMA = exports.getByIdDependencias = exports.getById = exports.getAllDependencias = exports.getAll = void 0;
const luxon_1 = require("luxon");
const sequelize_1 = require("sequelize");
const alta_1 = __importDefault(require("../models/alta"));
const clientePlanta_1 = __importDefault(require("../models/clientePlanta"));
const planta_1 = __importDefault(require("../models/planta"));
const cliente_1 = __importDefault(require("../models/cliente"));
const vendedor_1 = __importDefault(require("../models/vendedor"));
const partes_1 = __importDefault(require("../models/partes"));
const altaHistorico_1 = __importDefault(require("../models/altaHistorico"));
const altaActividad_1 = __importDefault(require("../models/altaActividad"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield alta_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getAllDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield alta_1.default.findAll({
        order: [['idalta', 'DESC']],
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
                model: altaHistorico_1.default,
                as: 'historicosAlta',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: altaActividad_1.default,
                as: 'actividadesAlta',
            },
        ],
    });
    res.json(list);
});
exports.getAllDependencias = getAllDependencias;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alta = yield alta_1.default.findByPk(id);
    if (alta) {
        res.json(alta);
    }
    else {
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getByIdDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alta = yield alta_1.default.findByPk(id, {
        order: [['idalta', 'DESC']],
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
                model: altaHistorico_1.default,
                as: 'historicosAlta',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: altaActividad_1.default,
                as: 'actividadesAlta',
            },
        ],
    });
    if (alta) {
        res.json(alta);
    }
    else {
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
});
exports.getByIdDependencias = getByIdDependencias;
const getPMA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alta = yield alta_1.default.findAll({
        where: { operacion: { [sequelize_1.Op.notIn]: ["Solicitud", "Terminado", "Cancelado"] } },
        order: [['idalta', 'DESC']],
        include: [
            {
                model: altaHistorico_1.default,
                as: 'historicosAlta',
                where: { version: { [sequelize_1.Op.eq]: [2] } },
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
        ],
    });
    if (alta) {
        res.json(alta);
    }
    else {
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
});
exports.getPMA = getPMA;
const getByclientePlanta_idclientePlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alta = yield alta_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (alta) {
        res.json(alta);
    }
    else {
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
});
exports.getByclientePlanta_idclientePlanta = getByclientePlanta_idclientePlanta;
const deleteAlta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alta = yield alta_1.default.findByPk(id);
    if (!alta) {
        res.status(404).json({
            msg: `No se encontro ningun permiso con id ${id}`
        });
    }
    else {
        yield alta.destroy();
        res.json({
            msg: `El permiso fue eliminado con exito!`
        });
    }
});
exports.deleteAlta = deleteAlta;
const postAlta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const alta = yield alta_1.default.create(body);
    res.json({
        response: alta,
        msg: 'El alta se agrego con exito!'
    });
});
exports.postAlta = postAlta;
const postAltaDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let condGuardado = true, logGuardado = [];
    const { body } = req;
    let idD = -1;
    if (body.idalta != null) {
        const doc = yield alta_1.default.findByPk(body.idalta).finally();
        if (doc != null) {
            try {
                const update = yield doc.update(body).finally();
                //console.log("Respuesta",update);
                if (update) {
                    idD = update.getDataValue('idalta');
                    logGuardado.push("Alta actualizada con exito");
                }
                else {
                    condGuardado = false;
                    logGuardado.push("Error en actualizar al actualiza la alta" + body.idalta + "\n");
                }
                idD = update.getDataValue('idalta');
                console.log("idD", idD);
                for (let i = 0; i < Object.keys(body.historicosAlta).length; i++) {
                    if (body.historicosAlta[i].idhistoricosAlta != null) {
                        const historico = yield altaHistorico_1.default.findByPk(body.historicosAlta[i].idhistoricosAlta);
                        if (historico) {
                            try {
                                yield historico.update(body.historicosAlta[i]);
                                if (historico) {
                                    logGuardado.push("Historico actualizado con exito " + body.historicosAlta[i].idhistoricosAlta);
                                }
                                else {
                                    logGuardado.push("Error al actualizar el historico " + body.historicosAlta[i].idhistoricosAlta + "\n");
                                }
                            }
                            catch (error) {
                                console.log("Error al actualizar el historico " + obtenerFechaActualMX(), error);
                                logGuardado.push("Error al actualizar el historico " + body.historicosAlta[i].idhistoricosAlta + " error:" + error + "\n");
                            }
                        }
                        else {
                            logGuardado.push("Error al actualizar el historico " + body.historicosAlta[i].idhistoricosAlta + " no existe\n");
                        }
                    }
                    else {
                        let historico = Object.assign(Object.assign({}, body.historicosAlta[i]), { alta_idAlta: idD, parte: {} });
                        console.log("historico", historico);
                        try {
                            const respuesta = yield altaHistorico_1.default.create(historico);
                            if (respuesta) {
                                /**Ah segun no existe idhistoricosAlta en respuesta*/
                                logGuardado.push("Historico creado con exito " + respuesta.getDataValue('idhistoricosAlta'));
                                //console.log("Historico creado con exito",altaHistorico);
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
                for (let i = 0; i < Object.keys(body.actividadesAlta).length; i++) {
                    if (body.actividadesAlta[i].idactividadesAlta != null) {
                        const actividad = yield altaActividad_1.default.findByPk(body.actividadesAlta[i].idactividadesAlta);
                        if (actividad) {
                            try {
                                yield actividad.update(body.actividadesAlta[i]);
                                logGuardado.push("Actividad actualizada con exito " + body.actividadesAlta[i].idactividadesAlta);
                            }
                            catch (error) {
                                console.log("Error al actualizar la actividad", error);
                                logGuardado.push("Error al actualizar la actividad " + body.actividadesAlta[i].idactividadesAlta + " error:" + error + "\n");
                            }
                        }
                        else {
                            logGuardado.push("Error al actualizar la actividad " + body.actividadesAlta[i].idactividadesAlta + " no existe\n");
                        }
                    }
                    else {
                        let actividad = Object.assign(Object.assign({}, body.actividadesAlta[i]), { alta_idalta: idD });
                        try {
                            const respuesta = yield altaActividad_1.default.create(actividad);
                            if (respuesta) {
                                /**Ah segun no existe idactividadesAlta en respuesta*/
                                logGuardado.push("Actividad creada con exito " + respuesta.getDataValue('idactividadesAlta'));
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
            catch (error) {
                console.log("Error al actualizar la alta" + obtenerFechaActualMX(), error);
                condGuardado = false;
                logGuardado.push("Error en actualizar al actualiza la alta" + body.idalta + " error: " + JSON.stringify(error) + "\n");
            }
        }
        else {
            condGuardado = false;
            logGuardado.push("Error en actualizar al obtener la alta" + body.idalta + "\n");
        }
    }
    else {
        console.log("body", body);
        const doc = yield alta_1.default.build(body, {
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
                    model: altaHistorico_1.default,
                    as: 'historicosAlta',
                },
                {
                    model: altaActividad_1.default,
                    as: 'actividadesAlta',
                },
            ]
        });
        try {
            let respuesta = yield doc.save().finally();
            if (respuesta) {
                idD = respuesta.getDataValue('idalta');
                logGuardado.push("Alta creada con exito " + idD);
            }
            else {
                condGuardado = false;
                logGuardado.push("Error al guardar la alta" + body.idalta + "\n");
            }
            //console.log("respuesta",respuesta);            
        }
        catch (error) {
            console.error("Error al guardar la alta " + obtenerFechaActualMX(), error);
            logGuardado.push("Error al guardar la alta " + body.idalta + " error:" + error + "\n");
            condGuardado = false;
        }
        idD = doc.getDataValue('idalta');
    }
    const docDB = yield alta_1.default.findByPk(idD, {
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
                model: altaHistorico_1.default,
                as: 'historicosAlta',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: altaActividad_1.default,
                as: 'actividadesAlta',
            },
        ]
    });
    res.json({
        response: docDB,
        msg: logGuardado,
    });
});
exports.postAltaDependencias = postAltaDependencias;
function obtenerFechaActualMX() {
    const mexicoCity = luxon_1.DateTime.now().setZone('America/Mexico_City');
    return mexicoCity.toFormat('yyyy-LL-dd HH:mm:ss');
}
const updateAlta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const alta = yield alta_1.default.findByPk(id);
    if (alta) {
        yield alta.update(body);
        res.json({
            msg: 'El Alta se actualizo con exito!',
            response: alta
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun permiso con id ${id}`
        });
    }
});
exports.updateAlta = updateAlta;
const getResumen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const alta_list = yield alta_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (alta_list.length > 0) {
        const altas = alta_list.map((alta) => alta.getDataValue('probabilidad'));
        resumen[0] = altas.filter((probabilidad) => probabilidad === 0).length;
        resumen[1] = altas.filter((probabilidad) => probabilidad === 1).length;
        resumen[2] = altas.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
});
exports.getResumen = getResumen;
