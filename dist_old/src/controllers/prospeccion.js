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
exports.getResumen = exports.updateProspeccion = exports.postProspeccionDependencias = exports.postProspeccion = exports.deleteProspeccion = exports.getByclientePlanta_idclientePlanta = exports.getByIdDependencias = exports.getById = exports.getAllDependencias = exports.getAll = void 0;
const luxon_1 = require("luxon");
const prospeccion_1 = __importDefault(require("../models/prospeccion"));
const clientePlanta_1 = __importDefault(require("../models/clientePlanta"));
const planta_1 = __importDefault(require("../models/planta"));
const cliente_1 = __importDefault(require("../models/cliente"));
const vendedor_1 = __importDefault(require("../models/vendedor"));
const partes_1 = __importDefault(require("../models/partes"));
const prospeccionHistorico_1 = __importDefault(require("../models/prospeccionHistorico"));
const prospeccionActividad_1 = __importDefault(require("../models/prospeccionActividad"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield prospeccion_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getAllDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield prospeccion_1.default.findAll({
        order: [['idprospecciones', 'DESC']],
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
                model: prospeccionHistorico_1.default,
                include: [
                    { model: partes_1.default, }
                ],
            },
            {
                model: prospeccionActividad_1.default,
            },
        ],
    });
    res.json(list);
});
exports.getAllDependencias = getAllDependencias;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prospeccion = yield prospeccion_1.default.findByPk(id);
    if (prospeccion) {
        res.json(prospeccion);
    }
    else {
        res.status(404).json({
            msg: `No existe una prospección con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getByIdDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prospeccion = yield prospeccion_1.default.findByPk(id, {
        order: [['idprospecciones', 'DESC']],
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
                model: prospeccionHistorico_1.default,
                as: 'historicosProspecciones',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: prospeccionActividad_1.default,
                as: 'actividadesProspecciones',
            },
        ],
    });
    if (prospeccion) {
        res.json(prospeccion);
    }
    else {
        res.status(404).json({
            msg: `No existe una prospección con ese id ${id}`
        });
    }
});
exports.getByIdDependencias = getByIdDependencias;
const getByclientePlanta_idclientePlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prospeccion = yield prospeccion_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (prospeccion) {
        res.json(prospeccion);
    }
    else {
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
});
exports.getByclientePlanta_idclientePlanta = getByclientePlanta_idclientePlanta;
const deleteProspeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prospeccion = yield prospeccion_1.default.findByPk(id);
    if (!prospeccion) {
        res.status(404).json({
            msg: `No se encontro ninguna prospección con id ${id}`
        });
    }
    else {
        yield prospeccion.destroy();
        res.json({
            msg: `La prospección fue eliminada con exito!`
        });
    }
});
exports.deleteProspeccion = deleteProspeccion;
const postProspeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const prospeccion = yield prospeccion_1.default.create(body);
    res.json({
        response: prospeccion,
        msg: 'La prospección se agrego con exito!'
    });
});
exports.postProspeccion = postProspeccion;
const postProspeccionDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let condGuardado = true, logGuardado = [];
    const { body } = req;
    let idD = -1;
    if (body.idprospecciones != null) {
        const doc = yield prospeccion_1.default.findByPk(body.idprospecciones).finally();
        if (doc != null) {
            try {
                const update = yield doc.update(body).finally();
                //console.log("Respuesta",update);
                if (update) {
                    idD = update.getDataValue('idprospecciones');
                    logGuardado.push("Prospeccion actualizada con exito");
                }
                else {
                    condGuardado = false;
                    logGuardado.push("Error en actualizar al actualiza la Prospeccion" + body.idprospecciones + "\n");
                }
                idD = update.getDataValue('idprospecciones');
                for (let i = 0; i < Object.keys(body.historicosProspecciones).length; i++) {
                    if (body.historicosProspecciones[i].idhistoricosProspecciones != null) {
                        const historico = yield prospeccionHistorico_1.default.findByPk(body.historicosProspecciones[i].idhistoricosProspecciones);
                        if (historico) {
                            try {
                                yield historico.update(body.historicosProspecciones[i]);
                                if (historico) {
                                    logGuardado.push("Historico actualizado con exito " + body.historicosProspecciones[i].idhistoricosProspecciones);
                                }
                                else {
                                    logGuardado.push("Error al actualizar el historico " + body.historicosProspecciones[i].idhistoricosProspecciones + "\n");
                                }
                            }
                            catch (error) {
                                console.log("Error al actualizar el historico " + obtenerFechaActualMX(), error);
                                logGuardado.push("Error al actualizar el historico " + body.historicosProspecciones[i].idhistoricosProspecciones + " error:" + error + "\n");
                            }
                        }
                        else {
                            logGuardado.push("Error al actualizar el historico " + body.historicosProspecciones[i].idhistoricosProspecciones + " no existe\n");
                        }
                    }
                    else {
                        let historico = Object.assign(Object.assign({}, body.historicosProspecciones[i]), { prospecciones_idprospecciones: idD });
                        try {
                            const respuesta = yield prospeccionHistorico_1.default.create(historico);
                            if (respuesta) {
                                logGuardado.push("Historico creado con exito " + respuesta.getDataValue('idhistoricosProspecciones'));
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
                for (let i = 0; i < Object.keys(body.actividadesProspecciones).length; i++) {
                    if (body.actividadesProspecciones[i].idactividadesProspecciones != null) {
                        const actividad = yield prospeccionActividad_1.default.findByPk(body.actividadesProspecciones[i].idactividadesProspecciones);
                        if (actividad) {
                            try {
                                yield actividad.update(body.actividadesProspecciones[i]);
                                logGuardado.push("Actividad actualizada con exito " + body.actividadesProspecciones[i].idactividadesProspecciones);
                            }
                            catch (error) {
                                console.log("Error al actualizar la actividad", error);
                                logGuardado.push("Error al actualizar la actividad " + body.actividadesProspecciones[i].idactividadesProspecciones + " error:" + error + "\n");
                            }
                        }
                        else {
                            logGuardado.push("Error al actualizar la actividad " + body.actividadesProspecciones[i].idactividadesProspecciones + " no existe\n");
                        }
                    }
                    else {
                        let actividad = Object.assign(Object.assign({}, body.actividadesProspecciones[i]), { prospecciones_idprospecciones: idD });
                        try {
                            const respuesta = yield prospeccionActividad_1.default.create(actividad);
                            if (respuesta) {
                                logGuardado.push("Actividad creada con exito " + respuesta.getDataValue('idactividadesProspecciones'));
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
                console.log("Error al actualizar la Prospeccion" + obtenerFechaActualMX(), error);
                condGuardado = false;
                logGuardado.push("Error en actualizar al actualiza la Prospeccion" + body.idprospecciones + " error: " + JSON.stringify(error) + "\n");
                logGuardado.push("No se relizaron cambios en la Prospeccion\n");
            }
        }
        else {
            condGuardado = false;
            logGuardado.push("Error en actualizar al obtener la Prospeccion" + body.idprospecciones + "\n");
            logGuardado.push("No se relizaron cambios en la Prospeccion\n");
        }
    }
    else {
        const doc = yield prospeccion_1.default.build(body, {
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
                    model: prospeccionHistorico_1.default,
                    as: 'historicosProspecciones',
                },
                {
                    model: prospeccionActividad_1.default,
                    as: 'actividadesProspecciones',
                },
            ]
        });
        try {
            let respuesta = yield doc.save().finally();
            if (respuesta) {
                idD = respuesta.getDataValue('idprospecciones');
                logGuardado.push("Prospeccion creada con exito " + idD);
            }
            else {
                condGuardado = false;
                logGuardado.push("Error al guardar la Prospeccion" + body.idprospecciones + "\n");
            }
            //console.log("respuesta",respuesta);            
        }
        catch (error) {
            console.error("Error al guardar la Prospeccion " + obtenerFechaActualMX(), error);
            logGuardado.push("Error al guardar la Prospeccion " + body.idprospecciones + " error:" + error + "\n");
            condGuardado = false;
        }
        idD = doc.getDataValue('idprospecciones');
    }
    const docDB = yield prospeccion_1.default.findByPk(idD, {
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
                model: prospeccionHistorico_1.default,
                as: 'historicosProspecciones',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: prospeccionActividad_1.default,
                as: 'actividadesProspecciones',
            },
        ]
    });
    res.json({
        response: docDB,
        msg: logGuardado,
    });
});
exports.postProspeccionDependencias = postProspeccionDependencias;
function obtenerFechaActualMX() {
    const mexicoCity = luxon_1.DateTime.now().setZone('America/Mexico_City');
    return mexicoCity.toFormat('yyyy-LL-dd HH:mm:ss');
}
const updateProspeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const prospeccion = yield prospeccion_1.default.findByPk(id);
    if (prospeccion) {
        yield prospeccion.update(body);
        res.json({
            msg: 'La prospección se actualizo con exito!',
            response: prospeccion
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ninguna prospeccion con id ${id}`
        });
    }
});
exports.updateProspeccion = updateProspeccion;
const getResumen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const prospeccion_list = yield prospeccion_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (prospeccion_list.length > 0) {
        const altas = prospeccion_list.map((item) => item.getDataValue('probabilidad'));
        resumen[0] = altas.filter((probabilidad) => probabilidad === 0).length;
        resumen[1] = altas.filter((probabilidad) => probabilidad === 1).length;
        resumen[2] = altas.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
});
exports.getResumen = getResumen;
