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
exports.tableroGral = exports.tableroCotizacion = void 0;
const cotizacion_1 = __importDefault(require("../models/cotizacion"));
const cotizacionHistorico_1 = __importDefault(require("../models/cotizacionHistorico"));
const prealta_1 = __importDefault(require("../models/prealta"));
const prealtaHistorico_1 = __importDefault(require("../models/prealtaHistorico"));
const alta_1 = __importDefault(require("../models/alta"));
const altaHistorico_1 = __importDefault(require("../models/altaHistorico"));
const factura_1 = __importDefault(require("../models/factura"));
const facturaHistorico_1 = __importDefault(require("../models/facturaHistorico"));
const cotizacionesPrealta_1 = __importDefault(require("../models/cotizacionesPrealta"));
const cotizacionesAlta_1 = __importDefault(require("../models/cotizacionesAlta"));
const prealtaAlta_1 = __importDefault(require("../models/prealtaAlta"));
const altaFactura_1 = __importDefault(require("../models/altaFactura"));
const cliente_1 = __importDefault(require("../models/cliente"));
const planta_1 = __importDefault(require("../models/planta"));
const vendedor_1 = __importDefault(require("../models/vendedor"));
const clientePlanta_1 = __importDefault(require("../models/clientePlanta"));
//Probar y duplicar
const tableroCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let regreso = [];
    let documentos = yield cotizacion_1.default.findAll().finally();
    //console.log(documentos);
    //documentos.map(async (documento)=>{
    for (let i = 0; i < documentos.length; i++) {
        const documento = documentos[i];
        const maxVersion = yield cotizacionHistorico_1.default.max('version', { where: { cotizaciones_idcotizaciones: documento.getDataValue('idcotizaciones') } }).finally();
        let historicoConsulta = yield cotizacionHistorico_1.default.findAll({ where: { cotizaciones_idcotizaciones: documento.getDataValue('idcotizaciones'), version: maxVersion } }).finally();
        let granTotal = 0;
        historicoConsulta.forEach((cot) => {
            granTotal += Number(cot.getDataValue('precioTotal'));
        });
        let clientePlantaConsulta = yield clientePlanta_1.default.findByPk(documento.getDataValue('clientePlanta_idclientePlanta')).finally();
        let plantaConsulta = yield planta_1.default.findByPk(clientePlantaConsulta.getDataValue('planta_idplanta')).finally();
        let vendedorConsulta = yield vendedor_1.default.findByPk(clientePlantaConsulta.getDataValue('vendedor_idvendedor')).finally();
        let clienteConsulta = yield cliente_1.default.findByPk(clientePlantaConsulta.getDataValue('cliente_idcliente')).finally();
        let cotizacionesPrealtaConsulta = yield cotizacionesPrealta_1.default.findAll({ where: { cotizaciones_idcotizaciones: documento.getDataValue('idcotizaciones') } }).finally();
        let cotizacionesAltaConsulta = yield cotizacionesAlta_1.default.findAll({ where: { cotizaciones_idcotizaciones: documento.getDataValue('idcotizaciones') } }).finally();
        regreso.push({
            documento: documento,
            granTotal: granTotal,
            historico: historicoConsulta,
            clientePlanta: clientePlantaConsulta,
            planta: plantaConsulta,
            vendedor: vendedorConsulta,
            cliente: clienteConsulta,
            cotizacionesPrealta: cotizacionesPrealtaConsulta,
            cotizacionesAlta: cotizacionesAltaConsulta,
        });
    }
    ;
    res.json(regreso);
});
exports.tableroCotizacion = tableroCotizacion;
/*async function tableroPrealta = async (req:Request,res:Response)=>{
    let regreso:PreAltaDespliegue[] = [];
    let documentos:Prealta[] = await Prealta.findAll();
    regreso.map((documento:Prealta)=>{
        regreso.push({
            documento:documento,
            historico: await,

        })
    });
}

async function tableroAlta = async (req:Request,res:Response)=>{
    let regreso:AltaDespliegue[] = [];
    let documentos:Alta[] = await Alta.findAll();
    regreso.map((documento:Alta)=>{
        regreso.push({
            documento:documento,
            historico: await,

        })
    });
}

async function tableroFactura = async (req:Request,res:Response)=>{
    let regreso:FacturaDespliegue[] = [];
    let documentos:Factura[] = await Factura.findAll();
    regreso.map((documento:Factura)=>{
        regreso.push({
            documento:documento,
            historico: await,

        })
    });
}*/
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
function copiaTablero(tablero) {
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
}
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
const tableroGral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let regresoTablero = [];
    let listacotizacion = yield cotizacion_1.default.findAll();
    let listaPrealta = yield prealta_1.default.findAll();
    let listaAlta = yield alta_1.default.findAll();
    let listaFactura = yield factura_1.default.findAll();
    //console.log("Original",listaFactura);
    let lineaRegreso;
    for (let i = 0; i < listacotizacion.length; i++) {
        lineaRegreso = {
            NumeroCotizacion: -1,
            NumeroPrealta: -1,
            NumeroAlta: -1,
            NumeroFactura: -1,
            cotizacion: "",
            prealta: "",
            alta: "",
            factura: "",
            montoCotizacion: -1,
            montoPrealta: -1,
            montoAlta: -1,
            montoFactura: -1,
            ProbabilidadCotizacion: "",
            FechaCotizacion: 0,
            FechaPrealta: 0,
            FechaAlta: 0,
            FechaFactura: 0,
            PlantaCotizacion: "",
            PlantaPrealta: "",
            PlantaAlta: "",
            PlantaFactura: "",
            VendedorCotizacion: "",
            VendedorPrealta: "",
            VendedorAlta: "",
            VendedorFactura: "",
            UsuarioCotizacion: "",
            UsuarioPrealta: "",
            UsuarioAlta: "",
            UsuarioFactura: "",
        };
        //console.log("listacotizacion!["+i+"]",listacotizacion![i]);
        lineaRegreso.NumeroCotizacion = listacotizacion[i].getDataValue("numero");
        lineaRegreso.cotizacion = listacotizacion[i].getDataValue("titulo");
        lineaRegreso.FechaCotizacion = FormatoFechaE(listacotizacion[i].getDataValue("fechaColocacion"));
        lineaRegreso.ProbabilidadCotizacion = obtenerProbabilidad(listacotizacion[i].getDataValue("probabilidad"));
        lineaRegreso.PlantaCotizacion = (yield obtenerPlanta(listacotizacion[i].getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombrepl");
        lineaRegreso.VendedorCotizacion = yield obtenerVendedor(listacotizacion[i].getDataValue("clientePlanta_idclientePlanta"));
        lineaRegreso.UsuarioCotizacion = (yield obtenerCliente(listacotizacion[i].getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombre");
        lineaRegreso.montoCotizacion = yield getPrecioCotizacion(listacotizacion[i].getDataValue("idcotizaciones"));
        let listaCotizacionesPrealta = yield cotizacionesPrealta_1.default.findAll({ where: { cotizaciones_idcotizaciones: listacotizacion[i].getDataValue("idcotizaciones") } }).finally();
        //console.log("listaCotizacionesPrealta",listaCotizacionesPrealta);
        if (listaCotizacionesPrealta.length == 0) {
            //regresoTablero.push(lineaRegreso);
        }
        else {
            for (let j = 0; j < listaCotizacionesPrealta.length; j++) {
                //console.log("alla");
                //console.log("listaCotizacionesPrealta["+j+"]",listaCotizacionesPrealta![j]);
                lineaRegreso.NumeroPrealta = listaCotizacionesPrealta[j].getDataValue("numeroPreAlta");
                let busquedaPrealta = yield prealta_1.default.findOne({ where: { idprealta: listaCotizacionesPrealta[j].getDataValue("prealta_idPreAlta") } }).finally();
                lineaRegreso.prealta = busquedaPrealta.getDataValue("titulo");
                lineaRegreso.FechaPrealta = FormatoFechaE(busquedaPrealta.getDataValue("fechaActualizacion"));
                lineaRegreso.PlantaPrealta = (yield obtenerPlanta(busquedaPrealta.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombrepl");
                lineaRegreso.VendedorPrealta = yield obtenerVendedor(busquedaPrealta.getDataValue("clientePlanta_idclientePlanta"));
                lineaRegreso.UsuarioPrealta = (yield obtenerCliente(busquedaPrealta.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombre");
                lineaRegreso.montoPrealta = yield getPrecioPrealta(listaCotizacionesPrealta[j].getDataValue("prealta_idPreAlta"));
                listaPrealta = listaPrealta.filter((buscado) => buscado.getDataValue("idprealta") != busquedaPrealta.getDataValue("idprealta"));
                //regresoTablero.push(lineaRegreso);
                //console.log("listaCotizacionesPrealta["+j+"]",listaCotizacionesPrealta![j]);
                let listaPrealtaAlta = yield prealtaAlta_1.default.findAll({ where: { prealta_idprealta: listaCotizacionesPrealta[j].getDataValue("prealta_idPreAlta") } }).finally();
                //console.log("listaPrealtaAlta",listaPrealtaAlta);                
                //console.log("length: "+listaPrealtaAlta!.length,listaPrealtaAlta!);   
                if (listaPrealtaAlta.length == 0) {
                    //console.log("LineaRegreso",lineaRegreso);
                    regresoTablero.push(copiaTablero(lineaRegreso));
                }
                else {
                    for (let k = 0; k < listaPrealtaAlta.length; k++) {
                        lineaRegreso.NumeroAlta = listaPrealtaAlta[k].getDataValue("numeroAlta");
                        let busquedaAlta = yield alta_1.default.findOne({ where: { idalta: listaPrealtaAlta[k].getDataValue("alta_idalta") } }).finally();
                        //console.log("busquedaAlta",busquedaAlta);
                        lineaRegreso.alta = busquedaAlta.getDataValue("titulo");
                        lineaRegreso.montoAlta = yield getPrecioAlta(listaPrealtaAlta[k].getDataValue("alta_idalta"));
                        listaAlta = listaAlta.filter((buscado) => buscado.getDataValue("idalta") != busquedaAlta.getDataValue("idalta"));
                        lineaRegreso.FechaAlta = FormatoFechaE(busquedaAlta.getDataValue("fechaActualizacion"));
                        lineaRegreso.PlantaAlta = (yield obtenerPlanta(busquedaAlta.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombrepl");
                        lineaRegreso.VendedorAlta = yield obtenerVendedor(busquedaAlta.getDataValue("clientePlanta_idclientePlanta"));
                        lineaRegreso.UsuarioAlta = (yield obtenerCliente(busquedaAlta.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombre");
                        let listaAltaFactura = yield altaFactura_1.default.findAll({ where: { alta_idalta: listaPrealtaAlta[k].getDataValue("alta_idalta") } }).finally();
                        //console.log("listaAltaFactura",listaAltaFactura);
                        //console.log("length: "+listaAltaFactura!.length,listaAltaFactura!);      
                        if (listaAltaFactura.length == 0) {
                            //console.log("LineaRegreso",lineaRegreso);
                            regresoTablero.push(copiaTablero(lineaRegreso));
                        }
                        else {
                            for (let l = 0; l < listaAltaFactura.length; l++) {
                                lineaRegreso.NumeroFactura = listaAltaFactura[l].getDataValue("numero");
                                let busquedaFactura = yield factura_1.default.findOne({ where: { idfactura: listaAltaFactura[l].getDataValue("factura_idfactura") } });
                                lineaRegreso.factura = busquedaFactura.getDataValue("titulo");
                                lineaRegreso.montoFactura = yield getPrecioFactura(listaAltaFactura[l].getDataValue("factura_idfactura"));
                                lineaRegreso.FechaFactura = FormatoFechaE(busquedaFactura.getDataValue("fechaini"));
                                lineaRegreso.PlantaFactura = (yield obtenerPlanta(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombrepl");
                                lineaRegreso.VendedorFactura = yield obtenerVendedor(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"));
                                lineaRegreso.UsuarioFactura = (yield obtenerCliente(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombre");
                                //console.log("busquedaFactura",busquedaFactura);
                                //console.log("idFactura",busquedaFactura!.getDataValue("idfactura"));
                                //console.log("listaFactura",listaFactura);
                                listaFactura = listaFactura.filter((buscado) => buscado.getDataValue("idfactura") != busquedaFactura.getDataValue("idfactura"));
                                //console.log("listaFactura",listaFactura);
                                //console.log("LineaRegreso",lineaRegreso);
                                regresoTablero.push(copiaTablero(lineaRegreso));
                                lineaRegreso.NumeroFactura = -1;
                                lineaRegreso.factura = "";
                            }
                        }
                    }
                    lineaRegreso.NumeroAlta = -1;
                    lineaRegreso.alta = "";
                }
            }
            lineaRegreso.NumeroPrealta = -1;
            lineaRegreso.prealta = "";
        }
        let listaCotizacionAlta = yield cotizacionesAlta_1.default.findAll({ where: { cotizaciones_idcotizaciones: listacotizacion[i].getDataValue("idcotizaciones") } }).finally();
        //console.log("listaCotizacionAlta",listaCotizacionAlta);
        if (listaCotizacionAlta.length == 0 && listaCotizacionesPrealta.length == 0) {
            //console.log("LineaRegreso",lineaRegreso);
            regresoTablero.push(copiaTablero(lineaRegreso));
        }
        else {
            for (let m = 0; m < listaCotizacionAlta.length; m++) {
                let busquedaAlta = yield alta_1.default.findOne({ where: { idalta: listaCotizacionAlta[m].getDataValue("alta_idalta") } }).finally();
                lineaRegreso.NumeroAlta = busquedaAlta.getDataValue("idalta");
                lineaRegreso.alta = busquedaAlta.getDataValue("titulo");
                lineaRegreso.FechaAlta = FormatoFechaE(busquedaAlta.getDataValue("fechaActualizacion"));
                lineaRegreso.PlantaAlta = (yield obtenerPlanta(busquedaAlta.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombrepl");
                lineaRegreso.VendedorAlta = yield obtenerVendedor(busquedaAlta.getDataValue("clientePlanta_idclientePlanta"));
                lineaRegreso.UsuarioAlta = (yield obtenerCliente(busquedaAlta.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombre");
                lineaRegreso.montoAlta = yield getPrecioAlta(listaCotizacionAlta[m].getDataValue("alta_idalta"));
                listaAlta = listaAlta.filter((buscado) => buscado.getDataValue("idalta") != busquedaAlta.getDataValue("idalta"));
                let listaAltaFactura = yield altaFactura_1.default.findAll({ where: { alta_idalta: listaCotizacionAlta[m].getDataValue("alta_idalta") } }).finally();
                //console.log("listaAltaFactura",listaAltaFactura);
                if (listaAltaFactura.length == 0) {
                    //console.log("LineaRegreso",lineaRegreso);
                    regresoTablero.push(copiaTablero(lineaRegreso));
                }
                else {
                    for (let m = 0; m < listaAltaFactura.length; m++) {
                        let busquedaFactura = yield factura_1.default.findOne({ where: { idfactura: listaAltaFactura[m].getDataValue("factura_idfactura") } }).finally();
                        lineaRegreso.NumeroFactura = busquedaFactura.getDataValue("numero");
                        lineaRegreso.factura = busquedaFactura.getDataValue("titulo");
                        //console.log("idfactura",busquedaFactura!.getDataValue("idfactura"));
                        lineaRegreso.FechaFactura = FormatoFechaE(busquedaFactura.getDataValue("fechaini"));
                        lineaRegreso.PlantaFactura = (yield obtenerPlanta(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombrepl");
                        lineaRegreso.VendedorFactura = yield obtenerVendedor(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"));
                        lineaRegreso.UsuarioFactura = (yield obtenerCliente(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombre");
                        lineaRegreso.montoFactura = yield getPrecioFactura(listaAltaFactura[m].getDataValue("factura_idfactura"));
                        listaFactura = listaFactura.filter((buscado) => buscado.getDataValue("idfactura") !== busquedaFactura.getDataValue("idfactura"));
                        //console.log("listaFactura",listaFactura);
                        //console.log("LineaRegreso",lineaRegreso);
                        regresoTablero.push(copiaTablero(lineaRegreso));
                        lineaRegreso.NumeroFactura = -1;
                        lineaRegreso.factura = "";
                    }
                }
            }
            lineaRegreso.NumeroAlta = -1;
            lineaRegreso.alta = "";
        }
    }
    for (let j = 0; j < listaPrealta.length; j++) {
        lineaRegreso = {
            NumeroCotizacion: -1,
            NumeroPrealta: -1,
            NumeroAlta: -1,
            NumeroFactura: -1,
            cotizacion: "",
            prealta: "",
            alta: "",
            factura: "",
            montoCotizacion: -1,
            montoPrealta: -1,
            montoAlta: -1,
            montoFactura: -1,
            ProbabilidadCotizacion: "",
            FechaCotizacion: 0,
            FechaPrealta: 0,
            FechaAlta: 0,
            FechaFactura: 0,
            PlantaCotizacion: "",
            PlantaPrealta: "",
            PlantaAlta: "",
            PlantaFactura: "",
            VendedorCotizacion: "",
            VendedorPrealta: "",
            VendedorAlta: "",
            VendedorFactura: "",
            UsuarioCotizacion: "",
            UsuarioPrealta: "",
            UsuarioAlta: "",
            UsuarioFactura: "",
        };
        //console.log("listaPrealta["+j+"]",listaPrealta![j]);
        lineaRegreso.NumeroPrealta = listaPrealta[j].getDataValue("numeroPreAlta");
        let busquedaPrealta = yield prealta_1.default.findOne({ where: { idprealta: listaPrealta[j].getDataValue("idprealta") } }).finally();
        lineaRegreso.prealta = busquedaPrealta.getDataValue("titulo");
        lineaRegreso.FechaPrealta = FormatoFechaE(busquedaPrealta.getDataValue("fechaActualizacion"));
        lineaRegreso.PlantaPrealta = (yield obtenerPlanta(busquedaPrealta.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombrepl");
        lineaRegreso.VendedorPrealta = yield obtenerVendedor(busquedaPrealta.getDataValue("clientePlanta_idclientePlanta"));
        lineaRegreso.UsuarioPrealta = (yield obtenerCliente(busquedaPrealta.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombre");
        lineaRegreso.montoPrealta = yield getPrecioPrealta(listaPrealta[j].getDataValue("idprealta"));
        //console.log("busquedaPrealta",busquedaPrealta);
        //listaPrealta = listaPrealta.filter((buscado)=> buscado.getDataValue("idprealta") != busquedaPrealta!.getDataValue("idprealta"));
        //regresoTablero.push(lineaRegreso);
        //console.log("listaCotizacionesPrealta["+j+"]",listaCotizacionesPrealta![j]);
        let listaPrealtaAlta = yield prealtaAlta_1.default.findAll({ where: { prealta_idprealta: listaPrealta[j].getDataValue("idprealta") } }).finally();
        //console.log("listaPrealtaAlta",listaPrealtaAlta);                
        //console.log("length: "+listaPrealtaAlta!.length,listaPrealtaAlta!);   
        if (listaPrealtaAlta.length == 0) {
            //console.log("LineaRegreso",lineaRegreso);
            regresoTablero.push(copiaTablero(lineaRegreso));
        }
        else {
            for (let k = 0; k < listaPrealtaAlta.length; k++) {
                lineaRegreso.NumeroAlta = listaPrealtaAlta[k].getDataValue("numeroAlta");
                let busquedaAlta = yield alta_1.default.findOne({ where: { idalta: listaPrealtaAlta[k].getDataValue("alta_idalta") } }).finally();
                //console.log("busquedaAlta",busquedaAlta);
                lineaRegreso.alta = busquedaAlta.getDataValue("titulo");
                lineaRegreso.FechaAlta = FormatoFechaE(busquedaAlta.getDataValue("fechaActualizacion"));
                lineaRegreso.PlantaAlta = (yield obtenerPlanta(busquedaAlta.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombrepl");
                lineaRegreso.VendedorAlta = yield obtenerVendedor(busquedaAlta.getDataValue("clientePlanta_idclientePlanta"));
                lineaRegreso.UsuarioAlta = (yield obtenerCliente(busquedaAlta.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombre");
                lineaRegreso.montoAlta = yield getPrecioAlta(listaPrealtaAlta[k].getDataValue("alta_idalta"));
                listaAlta = listaAlta.filter((buscado) => buscado.getDataValue("idalta") != busquedaAlta.getDataValue("idalta"));
                let listaAltaFactura = yield altaFactura_1.default.findAll({ where: { alta_idalta: listaPrealtaAlta[k].getDataValue("alta_idalta") } }).finally();
                //console.log("listaAltaFactura",listaAltaFactura);
                //console.log("length: "+listaAltaFactura!.length,listaAltaFactura!);      
                if (listaAltaFactura.length == 0) {
                    //console.log("LineaRegreso",lineaRegreso);
                    regresoTablero.push(copiaTablero(lineaRegreso));
                }
                else {
                    for (let l = 0; l < listaAltaFactura.length; l++) {
                        lineaRegreso.NumeroFactura = listaAltaFactura[l].getDataValue("numero");
                        let busquedaFactura = yield factura_1.default.findOne({ where: { idfactura: listaAltaFactura[l].getDataValue("factura_idfactura") } });
                        lineaRegreso.factura = busquedaFactura.getDataValue("titulo");
                        lineaRegreso.montoFactura = yield getPrecioFactura(listaAltaFactura[l].getDataValue("factura_idfactura"));
                        //console.log("idFactura",busquedaFactura!.getDataValue("idfactura"));
                        //console.log("listaFactura",listaFactura);
                        lineaRegreso.FechaFactura = FormatoFechaE(busquedaFactura.getDataValue("fechaini"));
                        lineaRegreso.PlantaFactura = (yield obtenerPlanta(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombrepl");
                        lineaRegreso.VendedorFactura = yield obtenerVendedor(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"));
                        lineaRegreso.UsuarioFactura = (yield obtenerCliente(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombre");
                        listaFactura = listaFactura.filter((buscado) => buscado.getDataValue("idfactura") != busquedaFactura.getDataValue("idfactura"));
                        //console.log("listaFactura",listaFactura);
                        //console.log("LineaRegreso",lineaRegreso);
                        regresoTablero.push(copiaTablero(lineaRegreso));
                        lineaRegreso.NumeroFactura = -1;
                        lineaRegreso.factura = "";
                    }
                }
            }
            lineaRegreso.NumeroAlta = -1;
            lineaRegreso.alta = "";
        }
    }
    for (let m = 0; m < listaAlta.length; m++) {
        lineaRegreso = {
            NumeroCotizacion: -1,
            NumeroPrealta: -1,
            NumeroAlta: -1,
            NumeroFactura: -1,
            cotizacion: "",
            prealta: "",
            alta: "",
            factura: "",
            montoCotizacion: -1,
            montoPrealta: -1,
            montoAlta: -1,
            montoFactura: -1,
            ProbabilidadCotizacion: "",
            FechaCotizacion: 0,
            FechaPrealta: 0,
            FechaAlta: 0,
            FechaFactura: 0,
            PlantaCotizacion: "",
            PlantaPrealta: "",
            PlantaAlta: "",
            PlantaFactura: "",
            VendedorCotizacion: "",
            VendedorPrealta: "",
            VendedorAlta: "",
            VendedorFactura: "",
            UsuarioCotizacion: "",
            UsuarioPrealta: "",
            UsuarioAlta: "",
            UsuarioFactura: "",
        };
        let busquedaAlta = yield alta_1.default.findOne({ where: { idalta: listaAlta[m].getDataValue("idalta") } }).finally();
        lineaRegreso.NumeroAlta = busquedaAlta.getDataValue("numeroAlta");
        lineaRegreso.alta = busquedaAlta.getDataValue("titulo");
        lineaRegreso.FechaAlta = FormatoFechaE(busquedaAlta.getDataValue("fechaActualizacion"));
        lineaRegreso.PlantaAlta = (yield obtenerPlanta(busquedaAlta.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombrepl");
        lineaRegreso.VendedorAlta = yield obtenerVendedor(busquedaAlta.getDataValue("clientePlanta_idclientePlanta"));
        lineaRegreso.UsuarioAlta = (yield obtenerCliente(busquedaAlta.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombre");
        lineaRegreso.montoAlta = yield getPrecioAlta(listaAlta[m].getDataValue("idalta"));
        let listaAltaFactura = yield altaFactura_1.default.findAll({ where: { alta_idalta: listaAlta[m].getDataValue("idalta") } }).finally();
        //listaAlta = listaAlta.filter((buscado)=> buscado.getDataValue("idalta") != busquedaAlta!.getDataValue("idalta"));
        //console.log("listaAltaFactura",listaAltaFactura);
        if (listaAltaFactura.length == 0) {
            //console.log("LineaRegreso",lineaRegreso);
            regresoTablero.push(copiaTablero(lineaRegreso));
        }
        else {
            for (let m = 0; m < listaAltaFactura.length; m++) {
                let busquedaFactura = yield factura_1.default.findOne({ where: { idfactura: listaAltaFactura[m].getDataValue("factura_idfactura") } }).finally();
                lineaRegreso.NumeroFactura = busquedaFactura.getDataValue("numero");
                lineaRegreso.factura = busquedaFactura.getDataValue("titulo");
                lineaRegreso.FechaFactura = FormatoFechaE(busquedaFactura.getDataValue("fechaini"));
                lineaRegreso.PlantaFactura = (yield obtenerPlanta(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombrepl");
                lineaRegreso.VendedorFactura = yield obtenerVendedor(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"));
                lineaRegreso.UsuarioFactura = (yield obtenerCliente(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombre");
                lineaRegreso.montoFactura = yield getPrecioFactura(listaAltaFactura[m].getDataValue("factura_idfactura"));
                //console.log("idfactura",busquedaFactura!.getDataValue("idfactura"));                        
                listaFactura = listaFactura.filter((buscado) => buscado.getDataValue("idfactura") !== busquedaFactura.getDataValue("idfactura"));
                //console.log("listaFactura",listaFactura);
                //console.log("LineaRegreso",lineaRegreso);
                regresoTablero.push(copiaTablero(lineaRegreso));
                lineaRegreso.NumeroFactura = -1;
                lineaRegreso.factura = "";
            }
        }
    }
    for (let m = 0; m < listaFactura.length; m++) {
        lineaRegreso = {
            NumeroCotizacion: -1,
            NumeroPrealta: -1,
            NumeroAlta: -1,
            NumeroFactura: -1,
            cotizacion: "",
            prealta: "",
            alta: "",
            factura: "",
            montoCotizacion: -1,
            montoPrealta: -1,
            montoAlta: -1,
            montoFactura: -1,
            ProbabilidadCotizacion: "",
            FechaCotizacion: 0,
            FechaPrealta: 0,
            FechaAlta: 0,
            FechaFactura: 0,
            PlantaCotizacion: "",
            PlantaPrealta: "",
            PlantaAlta: "",
            PlantaFactura: "",
            VendedorCotizacion: "",
            VendedorPrealta: "",
            VendedorAlta: "",
            VendedorFactura: "",
            UsuarioCotizacion: "",
            UsuarioPrealta: "",
            UsuarioAlta: "",
            UsuarioFactura: "",
        };
        let busquedaFactura = yield factura_1.default.findOne({ where: { idfactura: listaFactura[m].getDataValue("idfactura") } }).finally();
        lineaRegreso.NumeroFactura = busquedaFactura.getDataValue("numero");
        lineaRegreso.factura = busquedaFactura.getDataValue("titulo");
        lineaRegreso.FechaFactura = FormatoFechaE(busquedaFactura.getDataValue("fechaini"));
        lineaRegreso.PlantaFactura = (yield obtenerPlanta(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombrepl");
        lineaRegreso.VendedorFactura = yield obtenerVendedor(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"));
        lineaRegreso.UsuarioFactura = (yield obtenerCliente(busquedaFactura.getDataValue("clientePlanta_idclientePlanta"))).getDataValue("nombre");
        lineaRegreso.montoFactura = yield getPrecioFactura(listaFactura[m].getDataValue("idfactura"));
        //console.log("idfactura",busquedaFactura!.getDataValue("idfactura"));                        
        //console.log("listaFactura",listaFactura);
        //console.log("LineaRegreso",lineaRegreso);
        regresoTablero.push(copiaTablero(lineaRegreso));
        lineaRegreso.NumeroFactura = -1;
        lineaRegreso.factura = "";
    }
    /*console.log("listaPrealta",listaPrealta);
    console.log("listaAlta",listaAlta);
    console.log("listaFactura",listaFactura);*/
    //console.log("regresoTablero",regresoTablero);    
    res.json(regresoTablero);
});
exports.tableroGral = tableroGral;
