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
exports.getResumen = exports.updateOportunidad = exports.postOportunidadDependencias = exports.postOportunidad = exports.deleteOportunidad = exports.getByclientePlanta_idclientePlanta = exports.getByIdDependencias = exports.getById = exports.getAll = exports.getAllDependencias = void 0;
const luxon_1 = require("luxon");
const oportunidad_1 = __importDefault(require("../models/oportunidad"));
const clientePlanta_1 = __importDefault(require("../models/clientePlanta"));
const planta_1 = __importDefault(require("../models/planta"));
const cliente_1 = __importDefault(require("../models/cliente"));
const vendedor_1 = __importDefault(require("../models/vendedor"));
const partes_1 = __importDefault(require("../models/partes"));
const oportunidadHistorico_1 = __importDefault(require("../models/oportunidadHistorico"));
const oportunidadActividad_1 = __importDefault(require("../models/oportunidadActividad"));
const getAllDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield oportunidad_1.default.findAll({
        order: [['idoportunidades', 'DESC']],
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
                model: oportunidadHistorico_1.default,
                as: 'historicoOportunidades',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: oportunidadActividad_1.default,
                as: 'actividadesOportunidades',
            },
        ],
    });
    res.json(list);
});
exports.getAllDependencias = getAllDependencias;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield oportunidad_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oportunidad = yield oportunidad_1.default.findByPk(id);
    if (oportunidad)
        res.json(oportunidad);
    else {
        res.status(404).json({
            msg: `No existe una oportunidad con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getByIdDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oportunidad = yield oportunidad_1.default.findByPk(id, {
        order: [['idoportunidades', 'DESC']],
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
                model: oportunidadHistorico_1.default,
                as: 'historicoOportunidades',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: oportunidadActividad_1.default,
                as: 'actividadesOportunidades',
            },
        ],
    });
    if (oportunidad)
        res.json(oportunidad);
    else {
        res.status(404).json({
            msg: `No existe una oportunidad con ese id ${id}`
        });
    }
});
exports.getByIdDependencias = getByIdDependencias;
const getByclientePlanta_idclientePlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oportunidad = yield oportunidad_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (oportunidad) {
        res.json(oportunidad);
    }
    else {
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
});
exports.getByclientePlanta_idclientePlanta = getByclientePlanta_idclientePlanta;
const deleteOportunidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oportunidad = yield oportunidad_1.default.findByPk(id);
    if (!oportunidad) {
        res.status(404).json({
            msg: `No se encontro ninguna oportunidad con id ${id}`
        });
    }
    else {
        yield oportunidad.destroy();
        res.json({
            msg: `La oportunidad fue eliminada con exito!`
        });
    }
});
exports.deleteOportunidad = deleteOportunidad;
const postOportunidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const oportunidad = yield oportunidad_1.default.create(body);
    res.json({
        response: oportunidad,
        msg: 'La oportunidad se agrego con exito!'
    });
});
exports.postOportunidad = postOportunidad;
const postOportunidadDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let condGuardado = true, logGuardado = [];
    const { body } = req;
    let idD = -1;
    if (body.idoportunidades != null) {
        const doc = yield oportunidad_1.default.findByPk(body.idoportunidades).finally();
        if (doc != null) {
            try {
                const update = yield doc.update(body).finally();
                //console.log("Respuesta",update);
                if (update) {
                    idD = update.getDataValue('idoportunidades');
                    logGuardado.push("Oportunidades actualizada con exito");
                }
                else {
                    condGuardado = false;
                    logGuardado.push("Error en actualizar al actualiza la Oportunidades" + body.idoportunidades + "\n");
                }
                idD = update.getDataValue('idoportunidades');
                for (let i = 0; i < Object.keys(body.historicoOportunidades).length; i++) {
                    //console.log("i "+i,body.historicoOportunidades[i].idhistoricoOportunidades,(body.historicoOportunidades[i].idhistoricoOportunidades != undefined));
                    if (body.historicoOportunidades[i].idhistoricoOportunidades != undefined) {
                        const historico = yield oportunidadHistorico_1.default.findByPk(body.historicoOportunidades[i].idhistoricoOportunidades);
                        if (historico) {
                            try {
                                yield historico.update(body.historicoOportunidades[i]);
                                if (historico) {
                                    logGuardado.push("Historico actualizado con exito " + body.historicoOportunidades[i].idhistoricoOportunidades);
                                }
                                else {
                                    logGuardado.push("Error al actualizar el historico " + body.historicoOportunidades[i].idhistoricoOportunidades + "\n");
                                }
                            }
                            catch (error) {
                                console.log("Error al actualizar el historico " + obtenerFechaActualMX(), error);
                                logGuardado.push("Error al actualizar el historico " + body.historicoOportunidades[i].idhistoricoOportunidades + " error:" + error + "\n");
                            }
                        }
                        else {
                            logGuardado.push("Error al actualizar el historico " + body.historicoOportunidades[i].idhistoricoOportunidades + " no existe\n");
                        }
                    }
                    else {
                        let historico = Object.assign(Object.assign({}, body.historicoOportunidades[i]), { oportunidades_idoportunidades: idD });
                        try {
                            const respuesta = yield oportunidadHistorico_1.default.create(historico);
                            if (respuesta) {
                                logGuardado.push("Historico creado con exito " + respuesta.getDataValue('idhistoricoOportunidades'));
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
                for (let i = 0; i < Object.keys(body.actividadesOportunidades).length; i++) {
                    if (body.actividadesOportunidades[i].idactividadesOportunidades != null) {
                        const actividad = yield oportunidadActividad_1.default.findByPk(body.actividadesOportunidades[i].idactividadesOportunidades);
                        if (actividad) {
                            try {
                                yield actividad.update(body.actividadesOportunidades[i]);
                                logGuardado.push("Actividad actualizada con exito " + body.actividadesOportunidades[i].idactividadesOportunidades);
                            }
                            catch (error) {
                                console.log("Error al actualizar la actividad", error);
                                logGuardado.push("Error al actualizar la actividad " + body.actividadesOportunidades[i].idactividadesOportunidades + " error:" + error + "\n");
                            }
                        }
                        else {
                            logGuardado.push("Error al actualizar la actividad " + body.actividadesOportunidades[i].idactividadesOportunidades + " no existe\n");
                        }
                    }
                    else {
                        let actividad = Object.assign(Object.assign({}, body.actividadesOportunidades[i]), { oportunidades_idoportunidades: idD });
                        try {
                            const respuesta = yield oportunidadActividad_1.default.create(actividad);
                            if (respuesta) {
                                /**Ah segun no existe idactividadesOportunidades en respuesta*/
                                logGuardado.push("Actividad creada con exito " + respuesta.getDataValue('idactividadesOportunidades'));
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
                console.error("Error al actualizar la Oportunidades" + obtenerFechaActualMX(), error);
                condGuardado = false;
                logGuardado.push("Error en actualizar al actualiza la Oportunidades" + body.idoportunidades + " error: " + JSON.stringify(error) + "\n");
                logGuardado.push("No se relizaron cambios en la Oportunidades\n");
            }
        }
        else {
            condGuardado = false;
            logGuardado.push("Error en actualizar al obtener la Oportunidades" + body.idoportunidades + "\n");
        }
    }
    else {
        let body2 = Object.assign(Object.assign({}, body), { idoportunidades: undefined });
        const doc = yield oportunidad_1.default.build(body2, {
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
                    model: oportunidadHistorico_1.default,
                    as: 'historicoOportunidades',
                },
                {
                    model: oportunidadActividad_1.default,
                    as: 'actividadesOportunidades',
                },
            ]
        });
        try {
            let respuesta = yield doc.save().finally();
            if (respuesta) {
                idD = respuesta.getDataValue('idoportunidades');
                logGuardado.push("Oportunidades creada con exito " + idD);
            }
            else {
                condGuardado = false;
                logGuardado.push("Error al guardar la Oportunidades" + body.idoportunidades + "\n");
            }
            //console.log("respuesta",respuesta);            
        }
        catch (error) {
            console.error("Error al guardar la Oportunidades " + obtenerFechaActualMX(), error);
            logGuardado.push("Error al guardar la Oportunidades " + body.idoportunidades + " error:" + error + "\n");
            condGuardado = false;
        }
        idD = doc.getDataValue('idoportunidades');
    }
    const docDB = yield oportunidad_1.default.findByPk(idD, {
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
                model: oportunidadHistorico_1.default,
                as: 'historicoOportunidades',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: oportunidadActividad_1.default,
                as: 'actividadesOportunidades',
            },
        ]
    });
    res.json({
        response: docDB,
        msg: logGuardado,
    });
});
exports.postOportunidadDependencias = postOportunidadDependencias;
function obtenerFechaActualMX() {
    const mexicoCity = luxon_1.DateTime.now().setZone('America/Mexico_City');
    return mexicoCity.toFormat('yyyy-LL-dd HH:mm:ss');
}
const updateOportunidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const oportunidad = yield oportunidad_1.default.findByPk(id);
    if (oportunidad) {
        yield oportunidad.update(body);
        res.json({
            msg: 'La oportunidad se actualizo con exito!',
            response: oportunidad,
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun oportunidad con id ${id}`
        });
    }
});
exports.updateOportunidad = updateOportunidad;
const getResumen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const oportunidad_list = yield oportunidad_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (oportunidad_list.length > 0) {
        const Oportunidades = oportunidad_list.map((item) => item.getDataValue('probabilidad'));
        resumen[0] = Oportunidades.filter((probabilidad) => probabilidad === 0).length;
        resumen[1] = Oportunidades.filter((probabilidad) => probabilidad === 1).length;
        resumen[2] = Oportunidades.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
});
exports.getResumen = getResumen;
