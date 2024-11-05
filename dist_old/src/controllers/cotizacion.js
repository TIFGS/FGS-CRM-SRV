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
exports.actualizacionPrecios = exports.getResumen = exports.updateCotizacion = exports.postCotizacion = exports.postCotizacionDependencias = exports.deleteCotizacion = exports.getByclientePlanta_idclientePlanta = exports.getById = exports.getByIdDependencias = exports.getAllDependencias = exports.getAll = void 0;
const luxon_1 = require("luxon");
const cotizacion_1 = __importDefault(require("../models/cotizacion"));
const clientePlanta_1 = __importDefault(require("../models/clientePlanta"));
const planta_1 = __importDefault(require("../models/planta"));
const cliente_1 = __importDefault(require("../models/cliente"));
const vendedor_1 = __importDefault(require("../models/vendedor"));
const partes_1 = __importDefault(require("../models/partes"));
const cotizacionHistorico_1 = __importDefault(require("../models/cotizacionHistorico"));
const cotizacionActividad_1 = __importDefault(require("../models/cotizacionActividad"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield cotizacion_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getAllDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield cotizacion_1.default.findAll({
        order: [['idcotizaciones', 'DESC']],
        include: [
            {
                model: clientePlanta_1.default,
                as: 'clientePlanta',
                include: [
                    {
                        model: planta_1.default,
                        as: 'planta'
                    },
                    {
                        model: cliente_1.default,
                        as: 'cliente'
                    },
                    {
                        model: vendedor_1.default,
                        as: 'vendedor'
                    },
                ],
            },
            {
                model: cotizacionHistorico_1.default,
                as: 'historicosCotizaciones',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: cotizacionActividad_1.default,
                as: 'actividadesCotizaciones',
            },
        ],
    });
    res.json(list);
});
exports.getAllDependencias = getAllDependencias;
const getByIdDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cotizacion = yield cotizacion_1.default.findByPk(id, {
        order: [['idcotizaciones', 'DESC']],
        include: [
            {
                model: clientePlanta_1.default,
                as: 'clientePlanta',
                include: [
                    {
                        model: planta_1.default,
                        as: 'planta'
                    },
                    {
                        model: cliente_1.default,
                        as: 'cliente'
                    },
                    {
                        model: vendedor_1.default,
                        as: 'vendedor'
                    },
                ],
            },
            {
                model: cotizacionHistorico_1.default,
                as: 'historicosCotizaciones',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: cotizacionActividad_1.default,
                as: 'actividadesCotizaciones',
            },
        ],
    });
    if (cotizacion) {
        res.json(cotizacion);
    }
    else {
        console.error(`No existe una alta con ese id ${id}`, obtenerFechaActualMX());
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
});
exports.getByIdDependencias = getByIdDependencias;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cotizacion = yield cotizacion_1.default.findByPk(id);
    if (cotizacion) {
        res.json(cotizacion);
    }
    else {
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getByclientePlanta_idclientePlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cotizacion = yield cotizacion_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (cotizacion) {
        res.json(cotizacion);
    }
    else {
        console.error(`No existe una alta con ese id ${id}`, obtenerFechaActualMX());
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
});
exports.getByclientePlanta_idclientePlanta = getByclientePlanta_idclientePlanta;
const deleteCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cotizacion = yield cotizacion_1.default.findByPk(id);
    if (!cotizacion) {
        console.error(`No se encontro ningun permiso con id ${id}`, obtenerFechaActualMX());
        res.status(404).json({
            msg: `No se encontro ningun permiso con id ${id}`
        });
    }
    else {
        yield cotizacion.destroy();
        res.json({
            msg: `El permiso fue eliminado con exito!`
        });
    }
});
exports.deleteCotizacion = deleteCotizacion;
const postCotizacionDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let condGuardado = true, logGuardado = [];
    const { body } = req;
    let idCotizacion = -1;
    if (body.idcotizaciones != null) {
        const cotizacion = yield cotizacion_1.default.findByPk(body.idcotizaciones).finally();
        //console.log("Cot buscada");        
        if (cotizacion != null) {
            try {
                const update = yield cotizacion.update(body).finally();
                //console.log("Respuesta",update);
                if (update) {
                    idCotizacion = update.getDataValue('idcotizaciones');
                    logGuardado.push("Cotizacion actualizada con exito");
                }
                else {
                    condGuardado = false;
                    logGuardado.push("Error en actualizar al actualiza la cotizacion" + body.idcotizaciones + "\n");
                }
                idCotizacion = update.getDataValue('idcotizaciones');
            }
            catch (error) {
                console.log("Error al actualizar la cotizacion" + obtenerFechaActualMX(), error);
                condGuardado = false;
                logGuardado.push("Error en actualizar al actualiza la cotizacion" + body.idcotizaciones + " error: " + JSON.stringify(error) + "\n");
            }
        }
        else {
            condGuardado = false;
            logGuardado.push("Error en actualizar al obtener la cotizacion" + body.idcotizaciones + "\n");
        }
        if (condGuardado) {
            for (let i = 0; i < Object.keys(body.historicosCotizaciones).length; i++) {
                if (body.historicosCotizaciones[i].idhistoricosCotizaciones != null) {
                    const historico = yield cotizacionHistorico_1.default.findByPk(body.historicosCotizaciones[i].idhistoricosCotizaciones);
                    if (historico) {
                        try {
                            yield historico.update(body.historicosCotizaciones[i]);
                            if (historico) {
                                logGuardado.push("Historico actualizado con exito " + body.historicosCotizaciones[i].idhistoricosCotizaciones);
                            }
                            else {
                                logGuardado.push("Error al actualizar el historico " + body.historicosCotizaciones[i].idhistoricosCotizaciones + "\n");
                            }
                        }
                        catch (error) {
                            console.log("Error al actualizar el historico " + obtenerFechaActualMX(), error);
                            logGuardado.push("Error al actualizar el historico " + body.historicosCotizaciones[i].idhistoricosCotizaciones + " error:" + error + "\n");
                        }
                    }
                    else {
                        logGuardado.push("Error al actualizar el historico " + body.historicosCotizaciones[i].idhistoricosCotizaciones + " no existe\n");
                    }
                }
                else {
                    let historico = Object.assign(Object.assign({}, body.historicosCotizaciones[i]), { cotizaciones_idcotizaciones: idCotizacion });
                    try {
                        const respuesta = yield cotizacionHistorico_1.default.create(historico);
                        if (respuesta) {
                            /**Ah segun no existe idhistoricosCotizaciones en respuesta*/
                            logGuardado.push("Historico creado con exito " + respuesta.getDataValue('idhistoricosCotizaciones'));
                            //console.log("Historico creado con exito",cotizacionHistorico);
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
            for (let i = 0; i < Object.keys(body.actividadesCotizaciones).length; i++) {
                if (body.actividadesCotizaciones[i].idactividadesCotizaciones != null) {
                    const actividad = yield cotizacionActividad_1.default.findByPk(body.actividadesCotizaciones[i].idactividadesCotizaciones);
                    if (actividad) {
                        try {
                            yield actividad.update(body.actividadesCotizaciones[i]);
                            logGuardado.push("Actividad actualizada con exito " + body.actividadesCotizaciones[i].idactividadesCotizaciones);
                        }
                        catch (error) {
                            console.log("Error al actualizar la actividad", error);
                            logGuardado.push("Error al actualizar la actividad " + body.actividadesCotizaciones[i].idactividadesCotizaciones + " error:" + error + "\n");
                        }
                    }
                    else {
                        logGuardado.push("Error al actualizar la actividad " + body.actividadesCotizaciones[i].idactividadesCotizaciones + " no existe\n");
                    }
                }
                else {
                    let actividad = Object.assign(Object.assign({}, body.actividadesCotizaciones[i]), { cotizaciones_idcotizaciones: idCotizacion });
                    try {
                        const respuesta = yield cotizacionActividad_1.default.create(actividad);
                        if (respuesta) {
                            /**Ah segun no existe idactividadesCotizaciones en respuesta*/
                            logGuardado.push("Actividad creada con exito " + respuesta.getDataValue('idactividadesCotizaciones'));
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
            logGuardado.push("No se relizaron cambios en la cotizacion\n");
        }
    }
    else {
        let body2 = Object.assign(Object.assign({}, body), { idcotizaciones: undefined });
        const cotizacion = yield cotizacion_1.default.build(body2, {
            include: [
                {
                    model: cotizacionHistorico_1.default,
                    as: 'historicosCotizaciones',
                },
                {
                    model: cotizacionActividad_1.default,
                    as: 'actividadesCotizaciones',
                },
            ]
        });
        try {
            let respuesta = yield cotizacion.save().finally();
            if (respuesta) {
                idCotizacion = respuesta.getDataValue('idcotizaciones');
                logGuardado.push("Cotizacion creada con exito " + idCotizacion);
            }
            else {
                condGuardado = false;
                logGuardado.push("Error al guardar la cotizacion" + body.idcotizaciones + "\n");
            }
            //console.log("respuesta",respuesta);            
        }
        catch (error) {
            console.error("Error al guardar la cotizacion " + obtenerFechaActualMX(), error);
            logGuardado.push("Error al guardar la cotizacion " + body.idcotizaciones + " error:" + error + "\n");
            condGuardado = false;
        }
        idCotizacion = cotizacion.getDataValue('idcotizaciones');
    }
    const cotizacionDB = yield cotizacion_1.default.findByPk(idCotizacion, {
        order: [['idcotizaciones', 'DESC']],
        include: [
            {
                model: clientePlanta_1.default,
                as: 'clientePlanta',
                include: [
                    {
                        model: planta_1.default,
                        as: 'planta'
                    },
                    {
                        model: cliente_1.default,
                        as: 'cliente'
                    },
                    {
                        model: vendedor_1.default,
                        as: 'vendedor'
                    },
                ],
            },
            {
                model: cotizacionHistorico_1.default,
                as: 'historicosCotizaciones',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: cotizacionActividad_1.default,
                as: 'actividadesCotizaciones',
            },
        ],
    });
    res.json({
        response: cotizacionDB,
        msg: logGuardado,
    });
});
exports.postCotizacionDependencias = postCotizacionDependencias;
const postCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let idCotizacion = -1;
    if (body.idcotizaciones == null) {
        const cotizacion = yield cotizacion_1.default.build(body);
        yield cotizacion.save().
            then((cotizacion) => {
            res.json({
                response: cotizacion,
                msg: 'La cotizacion se agrego con exito!'
            });
        }).
            catch(error => {
            console.error("Error al guardar la cotizacion, ya existe", obtenerFechaActualMX());
            console.error(error, body);
            res.status(400).json({
                msg: `Error al guardar la cotización ${error}`
            });
        });
    }
    else {
        console.error("Error al guardar la cotizacion, ya existe", obtenerFechaActualMX());
        console.error(body);
        res.status(400).json({
            msg: 'Error al guardar la cotizacion ya existe'
        });
    }
});
exports.postCotizacion = postCotizacion;
const updateCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const cotizacion = yield cotizacion_1.default.findByPk(id);
    if (cotizacion) {
        yield cotizacion.update(body);
        res.json({
            msg: 'La cotización se actualizo con exito!',
            response: cotizacion
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ninguna catizacion con id ${id}`
        });
    }
});
exports.updateCotizacion = updateCotizacion;
const getResumen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const cotizacion_list = yield cotizacion_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (cotizacion_list.length > 0) {
        const cotizaciones = cotizacion_list.map((alta) => alta.getDataValue('probabilidad'));
        resumen[0] = cotizaciones.filter((probabilidad) => probabilidad === 0).length;
        resumen[1] = cotizaciones.filter((probabilidad) => probabilidad === 1).length;
        resumen[2] = cotizaciones.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
});
exports.getResumen = getResumen;
const actualizacionPrecios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.actualizacionPrecios = actualizacionPrecios;
function obtenerFechaActualMX() {
    const mexicoCity = luxon_1.DateTime.now().setZone('America/Mexico_City');
    return mexicoCity.toFormat('yyyy-LL-dd HH:mm:ss');
}
