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
exports.tableroFactura = exports.tableroAlta = exports.tableroPrealta = exports.tableroCotizacion = exports.tableroProspeccion = exports.tableroOportunidad = void 0;
const sequelize_1 = require("sequelize");
const oportunidad_1 = __importDefault(require("../models/oportunidad"));
const oportunidadHistorico_1 = __importDefault(require("../models/oportunidadHistorico"));
const oportunidadActividad_1 = __importDefault(require("../models/oportunidadActividad"));
const prospeccion_1 = __importDefault(require("../models/prospeccion"));
const prospeccionHistorico_1 = __importDefault(require("../models/prospeccionHistorico"));
const prospeccionActividad_1 = __importDefault(require("../models/prospeccionActividad"));
const cotizacion_1 = __importDefault(require("../models/cotizacion"));
const cotizacionHistorico_1 = __importDefault(require("../models/cotizacionHistorico"));
const cotizacionActividad_1 = __importDefault(require("../models/cotizacionActividad"));
const prealta_1 = __importDefault(require("../models/prealta"));
const prealtaHistorico_1 = __importDefault(require("../models/prealtaHistorico"));
const prealtaActividad_1 = __importDefault(require("../models/prealtaActividad"));
const alta_1 = __importDefault(require("../models/alta"));
const altaHistorico_1 = __importDefault(require("../models/altaHistorico"));
const altaActividad_1 = __importDefault(require("../models/altaActividad"));
const factura_1 = __importDefault(require("../models/factura"));
const facturaHistorico_1 = __importDefault(require("../models/facturaHistorico"));
const facturaActividad_1 = __importDefault(require("../models/facturaActividad"));
;
const cliente_1 = __importDefault(require("../models/cliente"));
const planta_1 = __importDefault(require("../models/planta"));
const vendedor_1 = __importDefault(require("../models/vendedor"));
const partes_1 = __importDefault(require("../models/partes"));
const clientePlanta_1 = __importDefault(require("../models/clientePlanta"));
/*export interface tablero {
    NumeroCotizacion: number,
    NumeroPrealta: number,
    NumeroAlta: number,
    NumeroFactura: number,
    cotizacion: string,
    prealta: string,
    alta: string,
    factura: string,
    montoCotizacion: number,
    montoPrealta: number,
    montoAlta: number,
    montoFactura: number,
    ProbabilidadCotizacion: string
    FechaCotizacion: number,
    FechaPrealta: number,
    FechaAlta: number,
    FechaFactura: number,
    PlantaCotizacion: string,
    PlantaPrealta: string,
    PlantaAlta: string,
    PlantaFactura: string,
    VendedorCotizacion:string,
    VendedorPrealta:string,
    VendedorAlta:string,
    VendedorFactura:string,
    UsuarioCotizacion:string,
    UsuarioPrealta:string,
    UsuarioAlta:string,
    UsuarioFactura:string,
}*/
//Probar y duplicar
const tableroOportunidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let regreso = [];
    let documentos = [];
    let modelo = [
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
        {
            model: clientePlanta_1.default,
            as: 'clientePlanta',
            include: [
                {
                    model: planta_1.default,
                    as: 'planta'
                },
                {
                    model: vendedor_1.default,
                    as: 'vendedor'
                },
                {
                    model: cliente_1.default,
                    as: 'cliente'
                },
            ]
        },
    ];
    //console.log("id",id);
    if (id == 'All') {
        documentos = yield oportunidad_1.default.findAll({
            include: modelo,
        }).finally();
        //console.log("documentos",documentos);
    }
    else {
        let ids = JSON.parse(id);
        documentos = yield oportunidad_1.default.findAll({
            where: { clientePlanta_idclientePlanta: { [sequelize_1.Op.in]: ids } },
            include: modelo,
        }).finally();
    }
    documentos.map((documento) => {
        regreso.push({
            documento: documento,
            granTotal: 0,
        });
    });
    res.json(regreso);
});
exports.tableroOportunidad = tableroOportunidad;
const tableroProspeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let regreso = [];
    let documentos = [];
    let modelo = [
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
        {
            model: clientePlanta_1.default,
            as: 'clientePlanta',
            include: [
                {
                    model: planta_1.default,
                    as: 'planta'
                },
                {
                    model: vendedor_1.default,
                    as: 'vendedor'
                },
                {
                    model: cliente_1.default,
                    as: 'cliente'
                },
            ]
        },
    ];
    //console.log("id",id);
    if (id == 'All') {
        documentos = yield prospeccion_1.default.findAll({
            include: modelo,
        }).finally();
        //console.log("documentos",documentos);
    }
    else {
        let ids = JSON.parse(id);
        documentos = yield prospeccion_1.default.findAll({
            where: { clientePlanta_idclientePlanta: { [sequelize_1.Op.in]: ids } },
            include: modelo,
        }).finally();
    }
    documentos.map((documento) => {
        regreso.push({
            documento: documento,
            granTotal: 0,
        });
    });
    res.json(regreso);
});
exports.tableroProspeccion = tableroProspeccion;
const tableroCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let regreso = [];
    let documentos = [];
    let modelo = [
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
        {
            model: clientePlanta_1.default,
            as: 'clientePlanta',
            include: [
                {
                    model: planta_1.default,
                    as: 'planta'
                },
                {
                    model: vendedor_1.default,
                    as: 'vendedor'
                },
                {
                    model: cliente_1.default,
                    as: 'cliente'
                },
            ]
        },
    ];
    //console.log("id",id);
    if (id == 'All') {
        documentos = yield cotizacion_1.default.findAll({
            include: modelo,
        }).finally();
        //console.log("documentos",documentos);
    }
    else {
        let ids = JSON.parse(id);
        documentos = yield cotizacion_1.default.findAll({
            where: { clientePlanta_idclientePlanta: { [sequelize_1.Op.in]: ids } },
            include: modelo,
        }).finally();
    }
    //console.log(documentos);
    //documentos.map(async (documento)=>{
    for (let i = 0; i < documentos.length; i++) {
        const documento = documentos[i];
        //console.log("Documento",documento);
        const maxVersion = yield cotizacionHistorico_1.default.max('version', { where: { cotizaciones_idcotizaciones: documento.getDataValue('idcotizaciones') } }).finally();
        let granTotal = 0;
        //console.log("historico",documento.getDataValue('historicosCotizaciones'));
        documento.getDataValue('historicosCotizaciones').forEach((cot) => {
            if (cot.getDataValue('version') == maxVersion) {
                granTotal += Number(cot.getDataValue('precioTotal'));
            }
        });
        regreso.push({
            documento: documento,
            granTotal: granTotal,
        });
    }
    ;
    res.json(regreso);
});
exports.tableroCotizacion = tableroCotizacion;
const tableroPrealta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let regreso = [];
    let documentos = [];
    let modelo = [
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
        {
            model: clientePlanta_1.default,
            as: 'clientePlanta',
            include: [
                {
                    model: planta_1.default,
                    as: 'planta'
                },
                {
                    model: vendedor_1.default,
                    as: 'vendedor'
                },
                {
                    model: cliente_1.default,
                    as: 'cliente'
                },
            ]
        },
    ];
    //console.log("id",id);
    if (id == 'All') {
        documentos = yield prealta_1.default.findAll({
            include: modelo,
        }).finally();
        //console.log("documentos",documentos);
    }
    else {
        let ids = JSON.parse(id);
        documentos = yield prealta_1.default.findAll({
            where: { clientePlanta_idclientePlanta: { [sequelize_1.Op.in]: ids } },
            include: modelo,
        }).finally();
    }
    //console.log(documentos);
    //documentos.map(async (documento)=>{
    for (let i = 0; i < documentos.length; i++) {
        const documento = documentos[i];
        //console.log("Documento",documento);
        const maxVersion = yield prealtaHistorico_1.default.max('version', { where: { prealta_idprealta: documento.getDataValue('idprealta') } }).finally();
        let granTotal = 0;
        //console.log("historico",documento.getDataValue('historicosCotizaciones'));
        documento.getDataValue('historicosPrealta').forEach((cot) => {
            if (cot.getDataValue('version') == 1) {
                granTotal += Number(cot.getDataValue('precioTotal'));
            }
        });
        regreso.push({
            documento: documento,
            granTotal: granTotal,
        });
    }
    ;
    res.json(regreso);
});
exports.tableroPrealta = tableroPrealta;
const tableroAlta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let regreso = [];
    let documentos = [];
    let modelo = [
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
        {
            model: clientePlanta_1.default,
            as: 'clientePlanta',
            include: [
                {
                    model: planta_1.default,
                    as: 'planta'
                },
                {
                    model: vendedor_1.default,
                    as: 'vendedor'
                },
                {
                    model: cliente_1.default,
                    as: 'cliente'
                },
            ]
        },
    ];
    if (id == 'All') {
        documentos = yield alta_1.default.findAll({
            include: modelo,
        }).finally();
        //console.log("documentos",documentos);
    }
    else {
        let ids = JSON.parse(id);
        documentos = yield alta_1.default.findAll({
            where: { clientePlanta_idclientePlanta: { [sequelize_1.Op.in]: ids } },
            include: modelo,
        }).finally();
    }
    //console.log(documentos);
    //documentos.map(async (documento)=>{
    for (let i = 0; i < documentos.length; i++) {
        const documento = documentos[i];
        //console.log("Documento",documento);
        const maxVersion = yield altaHistorico_1.default.max('version', { where: { alta_idAlta: documento.getDataValue('idalta') } }).finally();
        let granTotal = 0;
        //console.log("historico",documento.getDataValue('historicosCotizaciones'));
        documento.getDataValue('historicosAlta').forEach((cot) => {
            if (cot.getDataValue('version') == 1) {
                granTotal += Number(cot.getDataValue('precioTotal'));
            }
        });
        regreso.push({
            documento: documento,
            granTotal: granTotal,
        });
    }
    ;
    res.json(regreso);
});
exports.tableroAlta = tableroAlta;
const tableroFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let regreso = [];
    let documentos = [];
    let modelo = [
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
            as: 'actividadesFactura',
        },
        {
            model: clientePlanta_1.default,
            as: 'clientePlanta',
            include: [
                {
                    model: planta_1.default,
                    as: 'planta'
                },
                {
                    model: vendedor_1.default,
                    as: 'vendedor'
                },
                {
                    model: cliente_1.default,
                    as: 'cliente'
                },
            ]
        },
    ];
    //console.log("id",id);
    if (id == 'All') {
        documentos = yield factura_1.default.findAll({
            include: modelo,
        }).finally();
        //console.log("documentos",documentos);
    }
    else {
        let ids = JSON.parse(id);
        documentos = yield factura_1.default.findAll({
            where: { clientePlanta_idclientePlanta: { [sequelize_1.Op.in]: ids } },
            include: modelo,
        }).finally();
    }
    //console.log(documentos);
    //documentos.map(async (documento)=>{
    for (let i = 0; i < documentos.length; i++) {
        const documento = documentos[i];
        //console.log("Documento",documento);
        const maxVersion = yield facturaHistorico_1.default.max('version', { where: { factura_idfactura: documento.getDataValue('idfactura') } }).finally();
        let granTotal = 0;
        //console.log("historico",documento.getDataValue('historicosCotizaciones'));
        documento.getDataValue('historicosFacturas').forEach((cot) => {
            if (cot.getDataValue('version') == maxVersion) {
                granTotal += Number(cot.getDataValue('precioTotal'));
            }
        });
        regreso.push({
            documento: documento,
            granTotal: granTotal,
        });
    }
    ;
    res.json(regreso);
});
exports.tableroFactura = tableroFactura;
function obtenerPlanta(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield planta_1.default.findByPk((yield clientePlanta_1.default.findByPk(id)).getDataValue('planta_idplanta'));
    });
}
function obtenerVendedor(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let respuesta = (yield vendedor_1.default.findByPk((yield clientePlanta_1.default.findByPk(id)).getDataValue('vendedor_idvendedor')));
        return respuesta.getDataValue('nombre') + ' ' + respuesta.getDataValue('apellidos');
    });
}
function obtenerCliente(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield cliente_1.default.findByPk((yield clientePlanta_1.default.findByPk(id)).getDataValue('cliente_idcliente'));
    });
}
/*function copiaTablero(tablero:tablero):tablero{
    return {
        NumeroCotizacion: tablero.NumeroCotizacion,
        NumeroPrealta: tablero.NumeroPrealta,
        NumeroAlta: tablero.NumeroAlta,
        NumeroFactura: tablero.NumeroFactura,
        cotizacion: tablero.cotizacion,
        prealta: tablero.prealta,
        alta: tablero.alta,
        factura: tablero.factura,
        montoCotizacion: tablero.montoCotizacion,
        montoPrealta: tablero.montoPrealta,
        montoAlta: tablero.montoAlta,
        montoFactura: tablero.montoFactura,
        ProbabilidadCotizacion: tablero.ProbabilidadCotizacion,
        FechaCotizacion: tablero.FechaCotizacion,
        FechaPrealta: tablero.FechaPrealta,
        FechaAlta: tablero.FechaAlta,
        FechaFactura: tablero.FechaFactura,
        PlantaCotizacion: tablero.PlantaCotizacion,
        PlantaPrealta: tablero.PlantaPrealta,
        PlantaAlta: tablero.PlantaAlta,
        PlantaFactura: tablero.PlantaFactura,
        VendedorCotizacion: tablero.VendedorCotizacion,
        VendedorPrealta: tablero.VendedorPrealta,
        VendedorAlta: tablero.VendedorAlta,
        VendedorFactura: tablero.VendedorFactura,
        UsuarioCotizacion: tablero.UsuarioCotizacion,
        UsuarioPrealta: tablero.UsuarioPrealta,
        UsuarioAlta: tablero.UsuarioAlta,
        UsuarioFactura: tablero.UsuarioFactura,
    };
}*/
function getPrecioCotizacion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var precio = 0;
        const maxVersion = yield cotizacionHistorico_1.default.max('version', { where: { cotizaciones_idcotizaciones: id } });
        const cotHist = yield cotizacionHistorico_1.default.findAll({ where: { cotizaciones_idcotizaciones: id, version: maxVersion } });
        cotHist.forEach((cot) => {
            precio += Number(cot.getDataValue('precioTotal'));
        });
        return precio;
    });
}
function getPrecioPrealta(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var precio = 0;
        //const maxVersion = await prealtaHistorico.max('version', { where: { prealta_idprealta: id } });
        const cotHist = yield prealtaHistorico_1.default.findAll({ where: { prealta_idprealta: id, version: 1 } });
        cotHist.forEach((cot) => {
            precio += Number(cot.getDataValue('precioTotal'));
        });
        return precio;
    });
}
;
function getPrecioAlta(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var precio = 0;
        //const maxVersion = await altaHistorico.max('version', { where: { alta_idAlta: id } });
        const cotHist = yield altaHistorico_1.default.findAll({ where: { alta_idAlta: id, version: 1 } });
        cotHist.forEach((cot) => {
            precio += Number(cot.getDataValue('precioTotal'));
        });
        return precio;
    });
}
;
function getPrecioFactura(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var precio = 0;
        const maxVersion = yield facturaHistorico_1.default.max('version', { where: { factura_idfactura: id } });
        const cotHist = yield facturaHistorico_1.default.findAll({ where: { factura_idfactura: id, version: maxVersion } });
        cotHist.forEach((cot) => {
            precio += Number(cot.getDataValue('precioTotal'));
        });
        return precio;
    });
}
;
function FormatoFechaE(fecha) {
    if (fecha !== null) {
        fecha = new Date(fecha.toString());
        let day = fecha.getDate();
        let month = fecha.getMonth() + 1;
        let year = fecha.getFullYear();
        return (year - 1900) * 365 + (month - 1) * 30 + day + 1;
    }
    else {
        return 0;
    }
}
function obtenerProbabilidad(probabilidad) {
    let nombre = "";
    switch (probabilidad) {
        case 3:
            nombre = "Alta";
            break;
        case 2:
            nombre = "Media";
            break;
        case 1:
            nombre = "Baja";
            break;
        case 0:
            nombre = "StandBy";
            break;
        case -2:
            nombre = "Recotizacion";
            break;
        case -1:
            nombre = "Perdida";
            break;
        case 4:
            nombre = "Completada";
            break;
    }
    return nombre;
}
