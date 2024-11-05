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
exports.getResumen = exports.updateFactura = exports.postFacturaDependencias = exports.postFactura = exports.deleteFactura = exports.getByclientePlanta_idclientePlanta = exports.getByIdDependencias = exports.getById = exports.getAllDependencias = exports.getAll = void 0;
const luxon_1 = require("luxon");
const factura_1 = __importDefault(require("../models/factura"));
const clientePlanta_1 = __importDefault(require("../models/clientePlanta"));
const planta_1 = __importDefault(require("../models/planta"));
const cliente_1 = __importDefault(require("../models/cliente"));
const vendedor_1 = __importDefault(require("../models/vendedor"));
const partes_1 = __importDefault(require("../models/partes"));
const facturaHistorico_1 = __importDefault(require("../models/facturaHistorico"));
const facturaActividad_1 = __importDefault(require("../models/facturaActividad"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield factura_1.default.findAll();
    res.json(list);
});
exports.getAll = getAll;
const getAllDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield factura_1.default.findAll({
        order: [['idfactura', 'DESC']],
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
                model: facturaHistorico_1.default,
                as: 'historicosFacturas',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: facturaActividad_1.default,
                as: 'actividadesFacturas',
            },
        ],
    });
    res.json(list);
});
exports.getAllDependencias = getAllDependencias;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const factura = yield factura_1.default.findByPk(id);
    if (factura)
        res.json(factura);
    else {
        res.status(404).json({
            msg: `No existe una factura con ese id ${id}`
        });
    }
});
exports.getById = getById;
const getByIdDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const factura = yield factura_1.default.findByPk(id, {
        order: [['idfactura', 'DESC']],
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
                model: facturaHistorico_1.default,
                as: 'historicosFacturas',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: facturaActividad_1.default,
                as: 'actividadesFacturas',
            },
        ],
    });
    if (factura)
        res.json(factura);
    else {
        res.status(404).json({
            msg: `No existe una factura con ese id ${id}`
        });
    }
});
exports.getByIdDependencias = getByIdDependencias;
const getByclientePlanta_idclientePlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const factura = yield factura_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (factura) {
        res.json(factura);
    }
    else {
        res.status(404).json({
            msg: `No existe una Factura con ese id ${id}`
        });
    }
});
exports.getByclientePlanta_idclientePlanta = getByclientePlanta_idclientePlanta;
const deleteFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const factura = yield factura_1.default.findByPk(id);
    if (!factura) {
        res.status(404).json({
            msg: `No se encontro ninguna factura con id ${id}`
        });
    }
    else {
        yield factura.destroy();
        res.json({
            msg: `La factura fue eliminada con exito!`
        });
    }
});
exports.deleteFactura = deleteFactura;
const postFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const factura = yield factura_1.default.create(body);
    res.json({
        response: factura,
        msg: 'La factura se agrego con exito!'
    });
});
exports.postFactura = postFactura;
const postFacturaDependencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let condGuardado = true, logGuardado = [];
    const { body } = req;
    let idD = -1;
    if (body.idfactura != null) {
        const doc = yield factura_1.default.findByPk(body.idfactura).finally();
        //console.log("Cot buscada");        
        if (doc != null) {
            try {
                const update = yield doc.update(body).finally();
                //console.log("Respuesta",update);
                if (update) {
                    idD = update.getDataValue('idfactura');
                    logGuardado.push("Cotizacion actualizada con exito");
                }
                else {
                    condGuardado = false;
                    logGuardado.push("Error en actualizar al actualiza la factura" + body.idfactura + "\n");
                }
                idD = update.getDataValue('idfactura');
            }
            catch (error) {
                console.log("Error al actualizar la factura" + obtenerFechaActualMX(), error);
                condGuardado = false;
                logGuardado.push("Error en actualizar al actualiza la factura" + body.idfactura + " error: " + JSON.stringify(error) + "\n");
            }
        }
        else {
            condGuardado = false;
            logGuardado.push("Error en actualizar al obtener la factura" + body.idfactura + "\n");
        }
    }
    else {
        const doc = yield factura_1.default.build(body, {
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
                    model: facturaHistorico_1.default,
                    as: 'historicosFacturas',
                    include: [
                        {
                            model: partes_1.default,
                            as: 'parte',
                        }
                    ],
                },
                {
                    model: facturaActividad_1.default,
                    as: 'actividadesFacturas',
                },
            ]
        });
        try {
            let respuesta = yield doc.save().finally();
            if (respuesta) {
                idD = respuesta.getDataValue('idfactura');
                logGuardado.push("Cotizacion creada con exito " + idD);
            }
            else {
                condGuardado = false;
                logGuardado.push("Error al guardar la factura" + body.idfactura + "\n");
            }
            //console.log("respuesta",respuesta);            
        }
        catch (error) {
            console.error("Error al guardar la factura " + obtenerFechaActualMX(), error);
            logGuardado.push("Error al guardar la factura " + body.idfactura + " error:" + error + "\n");
            condGuardado = false;
        }
        idD = doc.getDataValue('idfactura');
    }
    if (condGuardado) {
        for (let i = 0; i < Object.keys(body.historicosFactura).length; i++) {
            if (body.historicosFactura[i].idhistoricosFactura != null) {
                const historico = yield facturaHistorico_1.default.findByPk(body.historicosFactura[i].idhistoricosFactura);
                if (historico) {
                    try {
                        yield historico.update(body.historicosFactura[i]);
                        if (historico) {
                            logGuardado.push("Historico actualizado con exito " + body.historicosFactura[i].idhistoricosFactura);
                        }
                        else {
                            logGuardado.push("Error al actualizar el historico " + body.historicosFactura[i].idhistoricosFactura + "\n");
                        }
                    }
                    catch (error) {
                        console.log("Error al actualizar el historico " + obtenerFechaActualMX(), error);
                        logGuardado.push("Error al actualizar el historico " + body.historicosFactura[i].idhistoricosFactura + " error:" + error + "\n");
                    }
                }
                else {
                    logGuardado.push("Error al actualizar el historico " + body.historicosFactura[i].idhistoricosFactura + " no existe\n");
                }
            }
            else {
                let historico = Object.assign(Object.assign({}, body.historicosFactura[i]), { factura_idfactura: idD });
                try {
                    const respuesta = yield facturaHistorico_1.default.create(historico);
                    if (respuesta) {
                        /**Ah segun no existe idhistoricosFactura en respuesta*/
                        logGuardado.push("Historico creado con exito " + respuesta.getDataValue('idhistoricosFactura'));
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
        for (let i = 0; i < Object.keys(body.actividadesFactura).length; i++) {
            if (body.actividadesFactura[i].idactividadesFactura != null) {
                const actividad = yield facturaActividad_1.default.findByPk(body.actividadesFactura[i].idactividadesFactura);
                if (actividad) {
                    try {
                        yield actividad.update(body.actividadesFactura[i]);
                        logGuardado.push("Actividad actualizada con exito " + body.actividadesFactura[i].idactividadesFactura);
                    }
                    catch (error) {
                        console.log("Error al actualizar la actividad", error);
                        logGuardado.push("Error al actualizar la actividad " + body.actividadesFactura[i].idactividadesFactura + " error:" + error + "\n");
                    }
                }
                else {
                    logGuardado.push("Error al actualizar la actividad " + body.actividadesFactura[i].idactividadesFactura + " no existe\n");
                }
            }
            else {
                let actividad = Object.assign(Object.assign({}, body.actividadesFactura[i]), { factura_idfactura: idD });
                try {
                    const respuesta = yield facturaActividad_1.default.create(actividad);
                    if (respuesta) {
                        /**Ah segun no existe idactividadesFactura en respuesta*/
                        logGuardado.push("Actividad creada con exito " + respuesta.getDataValue('idactividadesFactura'));
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
        logGuardado.push("No se relizaron cambios en la factura\n");
    }
    const docDB = yield factura_1.default.findByPk(idD, {
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
                model: facturaHistorico_1.default,
                as: 'historicosFacturas',
                include: [
                    {
                        model: partes_1.default,
                        as: 'parte',
                    }
                ],
            },
            {
                model: facturaActividad_1.default,
                as: 'actividadesFacturas',
            },
        ]
    });
    res.json({
        response: docDB,
        msg: logGuardado,
    });
});
exports.postFacturaDependencias = postFacturaDependencias;
function obtenerFechaActualMX() {
    const mexicoCity = luxon_1.DateTime.now().setZone('America/Mexico_City');
    return mexicoCity.toFormat('yyyy-LL-dd HH:mm:ss');
}
const updateFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const factura = yield factura_1.default.findByPk(id);
    if (factura) {
        yield factura.update(body);
        res.json({
            msg: 'La factura se actualizo con exito!',
            response: factura
        });
    }
    else {
        res.status(404).json({
            msg: `No se encontro ningun factura con id ${id}`
        });
    }
});
exports.updateFactura = updateFactura;
const getResumen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const factura_list = yield factura_1.default.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (factura_list.length > 0) {
        const factura = factura_list.map((Factura) => Factura.getDataValue('probabilidad'));
        resumen[0] = factura.filter((probabilidad) => probabilidad === 0).length;
        resumen[1] = factura.filter((probabilidad) => probabilidad === 1).length;
        resumen[2] = factura.filter((probabilidad) => probabilidad === 2).length;
    }
    res.json(resumen);
});
exports.getResumen = getResumen;
