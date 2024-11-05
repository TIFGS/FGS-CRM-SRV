import {Request,Response} from 'express';

import Cotizacion from '../models/cotizacion';
import cotizacionHistorico from '../models/cotizacionHistorico';

import Prealta from '../models/prealta';
import prealtaHistorico from '../models/prealtaHistorico';

import Alta from '../models/alta';
import altaHistorico from '../models/altaHistorico';

import Factura from '../models/factura';
import facturaHistorico from '../models/facturaHistorico';

import cotizacionesPrealta from '../models/cotizacionesPrealta';
import cotizacionesAlta from '../models/cotizacionesAlta';
import prealtaAlta from '../models/prealtaAlta';
import altaFactura from '../models/altaFactura';

import Cliente from '../models/cliente';
import planta from '../models/planta';
import vendedor from '../models/vendedor';
import clientePlanta from '../models/clientePlanta';

export interface cotizacionDespliegue{
    documento:any,
    granTotal:number,
    historico?:any[],
    clientePlanta:any,
    planta:any,
    vendedor:any,
    cliente:any,
    cotizacionesPrealta?:any[],
    cotizacionesAlta?:any[],
}

/*export interface PreAltaDespliegue{
    documento:Prealta,
    granTotal:number,
    historico?:prealtaHistorico[],
    clientePlanta:clientePlanta,
    planta:planta,
    vendedor:vendedor,
    cliente:Cliente,
    cotizacionesPrealta?:cotizacionesPrealta[],
    prealtaAlta?:prealtaAlta[],
}

export interface AltaDespliegue{
    documento:Alta,
    granTotal:number,
    historico?:altaHistorico[],
    clientePlanta:clientePlanta,
    planta:planta,
    vendedor:vendedor,
    cliente:Cliente,
    cotizacionesAlta?:cotizacionesAlta[],
    altaFactura?:altaFactura[],
}


export interface FacturaDespliegue{
    documento:Factura,
    granTotal:number,
    historico?:facturaHistorico[],
    clientePlanta:clientePlanta,
    planta:planta,
    vendedor:vendedor,
    cliente:Cliente,
    FacturaFactura?:altaFactura[],
}
*/

export interface tablero {
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
}


//Probar y duplicar
export const tableroCotizacion = async (req:Request,res:Response)=>{
    let regreso:cotizacionDespliegue[] = [];
    let documentos:any[] = await Cotizacion.findAll().finally();
    //console.log(documentos);
    //documentos.map(async (documento)=>{
    for(let i = 0; i < documentos.length; i++){
        const documento = documentos[i];
        const maxVersion = await cotizacionHistorico.max('version', { where: { cotizaciones_idcotizaciones: documento.getDataValue('idcotizaciones') } }).finally();
        let historicoConsulta = await cotizacionHistorico.findAll({where: {cotizaciones_idcotizaciones: documento.getDataValue('idcotizaciones'), version:maxVersion}}).finally();
        let granTotal:number = 0;
        historicoConsulta!.forEach((cot)=>{
            granTotal +=  Number(cot.getDataValue('precioTotal'));
        });
        let clientePlantaConsulta =  await  clientePlanta.findByPk(documento.getDataValue('clientePlanta_idclientePlanta')).finally();
        let plantaConsulta =  await  planta.findByPk(clientePlantaConsulta!.getDataValue('planta_idplanta')).finally();
        let vendedorConsulta =  await  vendedor.findByPk(clientePlantaConsulta!.getDataValue('vendedor_idvendedor')).finally();
        let clienteConsulta =  await  Cliente.findByPk(clientePlantaConsulta!.getDataValue('cliente_idcliente')).finally();
        let cotizacionesPrealtaConsulta = await cotizacionesPrealta.findAll({where:{cotizaciones_idcotizaciones: documento.getDataValue('idcotizaciones')}}).finally();
        let cotizacionesAltaConsulta = await cotizacionesAlta.findAll({where:{cotizaciones_idcotizaciones: documento.getDataValue('idcotizaciones')}}).finally();
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
        })
    };
    res.json(regreso);
}

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

async function obtenerPlanta(id:number){
    return  await planta.findByPk((await clientePlanta.findByPk(id))!.getDataValue('planta_idplanta'));
}

async function obtenerVendedor(id:number){
      let respuesta = (await vendedor.findByPk((await clientePlanta.findByPk(id))!.getDataValue('vendedor_idvendedor')))!;
      return respuesta.getDataValue('nombre') + ' ' + respuesta.getDataValue('apellidos');
}

async function obtenerCliente(id:number){
    return  await Cliente.findByPk((await clientePlanta.findByPk(id))!.getDataValue('cliente_idcliente'));
}

function copiaTablero(tablero:tablero):tablero{
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

async function  getPrecioCotizacion(id:number){
    var precio:number = 0;
    const maxVersion = await cotizacionHistorico.max('version', { where: { cotizaciones_idcotizaciones: id } });
    const cotHist = await cotizacionHistorico.findAll({where: {cotizaciones_idcotizaciones: id, version:maxVersion}});
    cotHist.forEach((cot)=>{
      precio +=  Number(cot.getDataValue('precioTotal'));
    });
    return precio;
}  

async function getPrecioPrealta(id:number){
    var precio:number = 0;
    //const maxVersion = await prealtaHistorico.max('version', { where: { prealta_idprealta: id } });
    const cotHist = await prealtaHistorico.findAll({where: {prealta_idprealta: id, version:1}});
    cotHist.forEach((cot)=>{
      precio +=  Number(cot.getDataValue('precioTotal'));
    });
    return precio;
};  

async function getPrecioAlta(id:number){    
    var precio:number = 0;
    //const maxVersion = await altaHistorico.max('version', { where: { alta_idAlta: id } });
    const cotHist = await altaHistorico.findAll({where: {alta_idAlta: id, version:1}});
    cotHist.forEach((cot)=>{
      precio +=  Number(cot.getDataValue('precioTotal'));
    });
    return precio;
}; 

async function getPrecioFactura(id:number){
    var precio:number = 0;
    const maxVersion = await facturaHistorico.max('version', { where: { factura_idfactura: id } });
    const cotHist = await facturaHistorico.findAll({where: {factura_idfactura: id, version:maxVersion}});
    cotHist.forEach((cot)=>{
      precio +=  Number(cot.getDataValue('precioTotal'));
    });
    return precio;
};

function FormatoFechaE(fecha:Date){

    if(fecha!==null){
        fecha = new Date(fecha.toString());
        let day = fecha.getDate();
        let month = fecha.getMonth() + 1;
        let year = fecha.getFullYear();

        return (year - 1900) * 365 + (month - 1) * 30 + day+ 1
    }else{
        return 0;
    }
}

function obtenerProbabilidad(probabilidad:number){
    let nombre:string = "";
    switch (probabilidad){
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

export const tableroGral = async (req:Request,res:Response)=>{
    let regresoTablero:tablero[] = [];
    let listacotizacion = await Cotizacion.findAll();
    let listaPrealta = await Prealta.findAll();    
    let listaAlta = await Alta.findAll();
    let listaFactura = await Factura.findAll();
    //console.log("Original",listaFactura);
    let lineaRegreso:tablero;
    for (let i = 0; i < listacotizacion!.length; i++) {
        lineaRegreso={
            NumeroCotizacion:-1,
            NumeroPrealta:-1,
            NumeroAlta:-1,
            NumeroFactura:-1,
            cotizacion:"",
            prealta:"",
            alta:"",
            factura:"",
            montoCotizacion:-1,
            montoPrealta:-1,
            montoAlta:-1,
            montoFactura:-1,
            ProbabilidadCotizacion:"",
            FechaCotizacion:0,
            FechaPrealta:0,
            FechaAlta:0,
            FechaFactura:0,
            PlantaCotizacion:"",
            PlantaPrealta:"",
            PlantaAlta:"",
            PlantaFactura:"",
            VendedorCotizacion:"",
            VendedorPrealta:"",
            VendedorAlta:"",
            VendedorFactura:"",
            UsuarioCotizacion:"",
            UsuarioPrealta:"",
            UsuarioAlta:"",
            UsuarioFactura:"",
        };
        //console.log("listacotizacion!["+i+"]",listacotizacion![i]);

        lineaRegreso.NumeroCotizacion = listacotizacion![i].getDataValue("numero");
        lineaRegreso.cotizacion = listacotizacion![i].getDataValue("titulo");
        lineaRegreso.FechaCotizacion = FormatoFechaE(listacotizacion![i].getDataValue("fechaColocacion"));
        lineaRegreso.ProbabilidadCotizacion = obtenerProbabilidad(listacotizacion![i].getDataValue("probabilidad"));
        
        
        lineaRegreso.PlantaCotizacion = (await obtenerPlanta(listacotizacion![i].getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombrepl");
        lineaRegreso.VendedorCotizacion = await obtenerVendedor(listacotizacion![i].getDataValue("clientePlanta_idclientePlanta"));
        lineaRegreso.UsuarioCotizacion = (await obtenerCliente(listacotizacion![i].getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombre");

        lineaRegreso.montoCotizacion = await getPrecioCotizacion(listacotizacion![i].getDataValue("idcotizaciones"));
        let listaCotizacionesPrealta = await cotizacionesPrealta.findAll({where: {cotizaciones_idcotizaciones: listacotizacion![i].getDataValue("idcotizaciones")}}).finally();        
        //console.log("listaCotizacionesPrealta",listaCotizacionesPrealta);
        if(listaCotizacionesPrealta!.length == 0){
            //regresoTablero.push(lineaRegreso);
        }else{
            for (let j = 0; j < listaCotizacionesPrealta!.length; j++) {
                //console.log("alla");
                //console.log("listaCotizacionesPrealta["+j+"]",listaCotizacionesPrealta![j]);
                lineaRegreso.NumeroPrealta = listaCotizacionesPrealta![j].getDataValue("numeroPreAlta");
                
                let busquedaPrealta = await Prealta.findOne({where: {idprealta: listaCotizacionesPrealta![j].getDataValue("prealta_idPreAlta")}}).finally();
                
                lineaRegreso.prealta = busquedaPrealta!.getDataValue("titulo");
                lineaRegreso.FechaPrealta = FormatoFechaE(busquedaPrealta!.getDataValue("fechaActualizacion"));
                lineaRegreso.PlantaPrealta = (await obtenerPlanta(busquedaPrealta!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombrepl");
                lineaRegreso.VendedorPrealta = await obtenerVendedor(busquedaPrealta!.getDataValue("clientePlanta_idclientePlanta"));
                lineaRegreso.UsuarioPrealta = (await obtenerCliente(busquedaPrealta!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombre");

                lineaRegreso.montoPrealta = await getPrecioPrealta(listaCotizacionesPrealta![j].getDataValue("prealta_idPreAlta"));
                listaPrealta = listaPrealta.filter((buscado)=> buscado.getDataValue("idprealta") != busquedaPrealta!.getDataValue("idprealta"));
                //regresoTablero.push(lineaRegreso);
                //console.log("listaCotizacionesPrealta["+j+"]",listaCotizacionesPrealta![j]);
                
                let listaPrealtaAlta = await prealtaAlta.findAll({where: {prealta_idprealta: listaCotizacionesPrealta![j].getDataValue("prealta_idPreAlta")}}).finally();
                //console.log("listaPrealtaAlta",listaPrealtaAlta);                
                //console.log("length: "+listaPrealtaAlta!.length,listaPrealtaAlta!);   
                if(listaPrealtaAlta!.length == 0){
                    //console.log("LineaRegreso",lineaRegreso);
                    regresoTablero.push(copiaTablero(lineaRegreso));
                }else{
                    for (let k = 0; k < listaPrealtaAlta!.length; k++) {
                        lineaRegreso.NumeroAlta = listaPrealtaAlta![k].getDataValue("numeroAlta");
                        
                        let busquedaAlta = await Alta.findOne({where: {idalta: listaPrealtaAlta![k].getDataValue("alta_idalta")}}).finally();
                        
                        //console.log("busquedaAlta",busquedaAlta);
                        lineaRegreso.alta = busquedaAlta!.getDataValue("titulo");
                        lineaRegreso.montoAlta = await getPrecioAlta(listaPrealtaAlta![k].getDataValue("alta_idalta"));
                        listaAlta = listaAlta.filter((buscado)=> buscado.getDataValue("idalta") != busquedaAlta!.getDataValue("idalta"));
                        
                        lineaRegreso.FechaAlta = FormatoFechaE(busquedaAlta!.getDataValue("fechaActualizacion"));
                        lineaRegreso.PlantaAlta = (await obtenerPlanta(busquedaAlta!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombrepl");
                        lineaRegreso.VendedorAlta = await obtenerVendedor(busquedaAlta!.getDataValue("clientePlanta_idclientePlanta"));
                        lineaRegreso.UsuarioAlta = (await obtenerCliente(busquedaAlta!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombre");

                        let listaAltaFactura = await altaFactura.findAll({where: {alta_idalta: listaPrealtaAlta![k].getDataValue("alta_idalta")}}).finally();
                        //console.log("listaAltaFactura",listaAltaFactura);
                        //console.log("length: "+listaAltaFactura!.length,listaAltaFactura!);      
                        if(listaAltaFactura!.length == 0){
                            //console.log("LineaRegreso",lineaRegreso);
                            regresoTablero.push(copiaTablero(lineaRegreso));
                        }else{
                            for (let l = 0; l < listaAltaFactura!.length; l++){
                                lineaRegreso.NumeroFactura = listaAltaFactura![l].getDataValue("numero");
                                let busquedaFactura = await Factura.findOne({where: {idfactura: listaAltaFactura![l].getDataValue("factura_idfactura")}});
                                
                                lineaRegreso.factura = busquedaFactura!.getDataValue("titulo");
                                lineaRegreso.montoFactura = await getPrecioFactura(listaAltaFactura![l].getDataValue("factura_idfactura"));
                                lineaRegreso.FechaFactura = FormatoFechaE(busquedaFactura!.getDataValue("fechaini"));
                                lineaRegreso.PlantaFactura = (await obtenerPlanta(busquedaFactura!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombrepl");
                                lineaRegreso.VendedorFactura = await obtenerVendedor(busquedaFactura!.getDataValue("clientePlanta_idclientePlanta"));
                                lineaRegreso.UsuarioFactura = (await obtenerCliente(busquedaFactura!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombre");
                                
                                //console.log("busquedaFactura",busquedaFactura);
                                //console.log("idFactura",busquedaFactura!.getDataValue("idfactura"));
                                //console.log("listaFactura",listaFactura);
                                
                                listaFactura = listaFactura.filter((buscado)=> buscado.getDataValue("idfactura") != busquedaFactura!.getDataValue("idfactura"));
                                //console.log("listaFactura",listaFactura);
                                //console.log("LineaRegreso",lineaRegreso);
                                regresoTablero.push(copiaTablero(lineaRegreso));
                                lineaRegreso.NumeroFactura = -1;
                                lineaRegreso.factura = "";
                            }   
                        }    
                    }
                    lineaRegreso.NumeroAlta =-1;
                    lineaRegreso.alta = ""; 
                }
            }
            lineaRegreso.NumeroPrealta = -1;
            lineaRegreso.prealta = "";
        }

        let listaCotizacionAlta = await cotizacionesAlta.findAll({where: {cotizaciones_idcotizaciones: listacotizacion![i].getDataValue("idcotizaciones")}}).finally();
        //console.log("listaCotizacionAlta",listaCotizacionAlta);
        if(listaCotizacionAlta.length == 0 && listaCotizacionesPrealta!.length == 0){
            //console.log("LineaRegreso",lineaRegreso);
            regresoTablero.push(copiaTablero(lineaRegreso));
        }else{
            for (let m = 0; m < listaCotizacionAlta.length; m++) {
                let busquedaAlta = await Alta.findOne({where: {idalta: listaCotizacionAlta[m].getDataValue("alta_idalta")}}).finally();
                
                lineaRegreso.NumeroAlta = busquedaAlta!.getDataValue("idalta");
                lineaRegreso.alta = busquedaAlta!.getDataValue("titulo");
                lineaRegreso.FechaAlta = FormatoFechaE(busquedaAlta!.getDataValue("fechaActualizacion"));
                lineaRegreso.PlantaAlta = (await obtenerPlanta(busquedaAlta!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombrepl");
                lineaRegreso.VendedorAlta = await obtenerVendedor(busquedaAlta!.getDataValue("clientePlanta_idclientePlanta"));
                lineaRegreso.UsuarioAlta = (await obtenerCliente(busquedaAlta!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombre");
                
                lineaRegreso.montoAlta = await getPrecioAlta(listaCotizacionAlta[m].getDataValue("alta_idalta"));
                listaAlta = listaAlta.filter((buscado)=> buscado.getDataValue("idalta") != busquedaAlta!.getDataValue("idalta"));
                let listaAltaFactura = await altaFactura.findAll({where: {alta_idalta: listaCotizacionAlta[m].getDataValue("alta_idalta")}}).finally();
                //console.log("listaAltaFactura",listaAltaFactura);
                if(listaAltaFactura!.length == 0){
                    //console.log("LineaRegreso",lineaRegreso);
                    regresoTablero.push(copiaTablero(lineaRegreso));
                }else{
                    for (let m = 0; m < listaAltaFactura!.length; m++){
                        let busquedaFactura = await Factura.findOne({where: {idfactura: listaAltaFactura![m].getDataValue("factura_idfactura")}}).finally();
                        
                        lineaRegreso.NumeroFactura = busquedaFactura!.getDataValue("numero");
                        lineaRegreso.factura = busquedaFactura!.getDataValue("titulo");
                        //console.log("idfactura",busquedaFactura!.getDataValue("idfactura"));
                        lineaRegreso.FechaFactura = FormatoFechaE(busquedaFactura!.getDataValue("fechaini"));
                        lineaRegreso.PlantaFactura = (await obtenerPlanta(busquedaFactura!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombrepl");
                        lineaRegreso.VendedorFactura = await obtenerVendedor(busquedaFactura!.getDataValue("clientePlanta_idclientePlanta"));
                        lineaRegreso.UsuarioFactura = (await obtenerCliente(busquedaFactura!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombre");

                        lineaRegreso.montoFactura = await getPrecioFactura(listaAltaFactura![m].getDataValue("factura_idfactura"));                 
                        listaFactura = listaFactura.filter((buscado)=> buscado.getDataValue("idfactura") !== busquedaFactura!.getDataValue("idfactura"));
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
    for (let j = 0; j < listaPrealta!.length; j++) {
        lineaRegreso={
            NumeroCotizacion:-1,
            NumeroPrealta:-1,
            NumeroAlta:-1,
            NumeroFactura:-1,
            cotizacion:"",
            prealta:"",
            alta:"",
            factura:"",
            montoCotizacion:-1,
            montoPrealta:-1,
            montoAlta:-1,
            montoFactura:-1,
            ProbabilidadCotizacion:"",
            FechaCotizacion:0,
            FechaPrealta:0,
            FechaAlta:0,
            FechaFactura:0,
            PlantaCotizacion:"",
            PlantaPrealta:"",
            PlantaAlta:"",
            PlantaFactura:"",
            VendedorCotizacion:"",
            VendedorPrealta:"",
            VendedorAlta:"",
            VendedorFactura:"",
            UsuarioCotizacion:"",
            UsuarioPrealta:"",
            UsuarioAlta:"",
            UsuarioFactura:"",
        };
        //console.log("listaPrealta["+j+"]",listaPrealta![j]);
        lineaRegreso.NumeroPrealta = listaPrealta![j].getDataValue("numeroPreAlta");
        let busquedaPrealta = await Prealta.findOne({where: {idprealta: listaPrealta![j].getDataValue("idprealta")}}).finally();
        
        lineaRegreso.prealta = busquedaPrealta!.getDataValue("titulo");
        lineaRegreso.FechaPrealta = FormatoFechaE(busquedaPrealta!.getDataValue("fechaActualizacion"));
        lineaRegreso.PlantaPrealta = (await obtenerPlanta( busquedaPrealta!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombrepl");
        lineaRegreso.VendedorPrealta = await obtenerVendedor(busquedaPrealta!.getDataValue("clientePlanta_idclientePlanta"));
        lineaRegreso.UsuarioPrealta = (await obtenerCliente(busquedaPrealta!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombre");
        
        lineaRegreso.montoPrealta = await getPrecioPrealta(listaPrealta![j].getDataValue("idprealta"));
        //console.log("busquedaPrealta",busquedaPrealta);

        //listaPrealta = listaPrealta.filter((buscado)=> buscado.getDataValue("idprealta") != busquedaPrealta!.getDataValue("idprealta"));
        //regresoTablero.push(lineaRegreso);
        //console.log("listaCotizacionesPrealta["+j+"]",listaCotizacionesPrealta![j]);
        let listaPrealtaAlta = await prealtaAlta.findAll({where: {prealta_idprealta: listaPrealta![j].getDataValue("idprealta")}}).finally();
        //console.log("listaPrealtaAlta",listaPrealtaAlta);                
        //console.log("length: "+listaPrealtaAlta!.length,listaPrealtaAlta!);   
        if(listaPrealtaAlta!.length == 0){
            //console.log("LineaRegreso",lineaRegreso);
            regresoTablero.push(copiaTablero(lineaRegreso));
        }else{
            for (let k = 0; k < listaPrealtaAlta!.length; k++) {
                lineaRegreso.NumeroAlta = listaPrealtaAlta![k].getDataValue("numeroAlta");
                let busquedaAlta = await Alta.findOne({where: {idalta: listaPrealtaAlta![k].getDataValue("alta_idalta")}}).finally();
                
                //console.log("busquedaAlta",busquedaAlta);
                lineaRegreso.alta = busquedaAlta!.getDataValue("titulo");
                lineaRegreso.FechaAlta = FormatoFechaE(busquedaAlta!.getDataValue("fechaActualizacion"));
                lineaRegreso.PlantaAlta = (await obtenerPlanta(busquedaAlta!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombrepl");
                lineaRegreso.VendedorAlta = await obtenerVendedor(busquedaAlta!.getDataValue("clientePlanta_idclientePlanta"));
                lineaRegreso.UsuarioAlta = (await obtenerCliente(busquedaAlta!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombre");

                lineaRegreso.montoAlta = await getPrecioAlta(listaPrealtaAlta![k].getDataValue("alta_idalta"));                listaAlta = listaAlta.filter((buscado)=> buscado.getDataValue("idalta") != busquedaAlta!.getDataValue("idalta"));
                let listaAltaFactura = await altaFactura.findAll({where: {alta_idalta: listaPrealtaAlta![k].getDataValue("alta_idalta")}}).finally();
                //console.log("listaAltaFactura",listaAltaFactura);
                //console.log("length: "+listaAltaFactura!.length,listaAltaFactura!);      
                if(listaAltaFactura!.length == 0){
                    //console.log("LineaRegreso",lineaRegreso);
                    regresoTablero.push(copiaTablero(lineaRegreso));
                }else{
                    for (let l = 0; l < listaAltaFactura!.length; l++){
                        lineaRegreso.NumeroFactura = listaAltaFactura![l].getDataValue("numero");
                        let busquedaFactura = await Factura.findOne({where: {idfactura: listaAltaFactura![l].getDataValue("factura_idfactura")}});
                        
                        lineaRegreso.factura = busquedaFactura!.getDataValue("titulo");
                        lineaRegreso.montoFactura = await getPrecioFactura(listaAltaFactura![l].getDataValue("factura_idfactura"));
                        //console.log("idFactura",busquedaFactura!.getDataValue("idfactura"));
                        //console.log("listaFactura",listaFactura);
                        lineaRegreso.FechaFactura = FormatoFechaE(busquedaFactura!.getDataValue("fechaini"));
                        lineaRegreso.PlantaFactura = (await obtenerPlanta (busquedaFactura!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombrepl");
                        lineaRegreso.VendedorFactura = await obtenerVendedor (busquedaFactura!.getDataValue("clientePlanta_idclientePlanta"));
                        lineaRegreso.UsuarioFactura = (await obtenerCliente (busquedaFactura!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombre");

                        listaFactura = listaFactura.filter((buscado)=> buscado.getDataValue("idfactura") != busquedaFactura!.getDataValue("idfactura"));
                        //console.log("listaFactura",listaFactura);
                        //console.log("LineaRegreso",lineaRegreso);
                        regresoTablero.push(copiaTablero(lineaRegreso));
                        lineaRegreso.NumeroFactura = -1;
                        lineaRegreso.factura = "";
                    }   
                }    
            }
            lineaRegreso.NumeroAlta =-1;
            lineaRegreso.alta = ""; 
        }
    }
    for (let m = 0; m < listaAlta!.length; m++) {
        lineaRegreso={
            NumeroCotizacion:-1,
            NumeroPrealta:-1,
            NumeroAlta:-1,
            NumeroFactura:-1,
            cotizacion:"",
            prealta:"",
            alta:"",
            factura:"",
            montoCotizacion:-1,
            montoPrealta:-1,
            montoAlta:-1,
            montoFactura:-1,
            ProbabilidadCotizacion:"",
            FechaCotizacion:0,
            FechaPrealta:0,
            FechaAlta:0,
            FechaFactura:0,
            PlantaCotizacion:"",
            PlantaPrealta:"",
            PlantaAlta:"",
            PlantaFactura:"",
            VendedorCotizacion:"",
            VendedorPrealta:"",
            VendedorAlta:"",
            VendedorFactura:"",
            UsuarioCotizacion:"",
            UsuarioPrealta:"",
            UsuarioAlta:"",
            UsuarioFactura:"",
        };
        let busquedaAlta = await Alta.findOne({where: {idalta: listaAlta[m].getDataValue("idalta")}}).finally();
        
        lineaRegreso.NumeroAlta = busquedaAlta!.getDataValue("numeroAlta");
        lineaRegreso.alta = busquedaAlta!.getDataValue("titulo");
        lineaRegreso.FechaAlta = FormatoFechaE(busquedaAlta!.getDataValue("fechaActualizacion"));
        lineaRegreso.PlantaAlta = (await obtenerPlanta(busquedaAlta!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombrepl");
        lineaRegreso.VendedorAlta = await obtenerVendedor(busquedaAlta!.getDataValue("clientePlanta_idclientePlanta"));
        lineaRegreso.UsuarioAlta = (await obtenerCliente(busquedaAlta!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombre");
        
        lineaRegreso.montoAlta = await getPrecioAlta(listaAlta[m].getDataValue("idalta"));
        let listaAltaFactura = await altaFactura.findAll({where: {alta_idalta: listaAlta[m].getDataValue("idalta")}}).finally();
        //listaAlta = listaAlta.filter((buscado)=> buscado.getDataValue("idalta") != busquedaAlta!.getDataValue("idalta"));
        //console.log("listaAltaFactura",listaAltaFactura);
        if(listaAltaFactura!.length == 0){
            //console.log("LineaRegreso",lineaRegreso);
            regresoTablero.push(copiaTablero(lineaRegreso));
        }else{
            for (let m = 0; m < listaAltaFactura!.length; m++){
                let busquedaFactura = await Factura.findOne({where: {idfactura: listaAltaFactura![m].getDataValue("factura_idfactura")}}).finally();
                
                lineaRegreso.NumeroFactura = busquedaFactura!.getDataValue("numero");
                lineaRegreso.factura = busquedaFactura!.getDataValue("titulo");
                lineaRegreso.FechaFactura = FormatoFechaE(busquedaFactura!.getDataValue("fechaini"));
                lineaRegreso.PlantaFactura = (await obtenerPlanta (busquedaFactura!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombrepl");
                lineaRegreso.VendedorFactura = await obtenerVendedor (busquedaFactura!.getDataValue("clientePlanta_idclientePlanta"));
                lineaRegreso.UsuarioFactura = (await obtenerCliente (busquedaFactura!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombre");

                lineaRegreso.montoFactura = await getPrecioFactura(listaAltaFactura![m].getDataValue("factura_idfactura"));
                //console.log("idfactura",busquedaFactura!.getDataValue("idfactura"));                        
                listaFactura = listaFactura.filter((buscado)=> buscado.getDataValue("idfactura") !== busquedaFactura!.getDataValue("idfactura"));
                //console.log("listaFactura",listaFactura);
                //console.log("LineaRegreso",lineaRegreso);
                regresoTablero.push(copiaTablero(lineaRegreso));
                lineaRegreso.NumeroFactura = -1;
                lineaRegreso.factura = "";
            }
        }
    }
    for (let m = 0; m < listaFactura!.length; m++){
        lineaRegreso={
            NumeroCotizacion:-1,
            NumeroPrealta:-1,
            NumeroAlta:-1,
            NumeroFactura:-1,
            cotizacion:"",
            prealta:"",
            alta:"",
            factura:"",
            montoCotizacion:-1,
            montoPrealta:-1,
            montoAlta:-1,
            montoFactura:-1,
            ProbabilidadCotizacion:"",
            FechaCotizacion:0,
            FechaPrealta:0,
            FechaAlta:0,
            FechaFactura:0,
            PlantaCotizacion:"",
            PlantaPrealta:"",
            PlantaAlta:"",
            PlantaFactura:"",
            VendedorCotizacion:"",
            VendedorPrealta:"",
            VendedorAlta:"",
            VendedorFactura:"",
            UsuarioCotizacion:"",
            UsuarioPrealta:"",
            UsuarioAlta:"",
            UsuarioFactura:"",
        };
        let busquedaFactura = await Factura.findOne({where: {idfactura: listaFactura![m].getDataValue("idfactura")}}).finally();
        
        lineaRegreso.NumeroFactura = busquedaFactura!.getDataValue("numero");
        lineaRegreso.factura = busquedaFactura!.getDataValue("titulo");
        lineaRegreso.FechaFactura = FormatoFechaE(busquedaFactura!.getDataValue("fechaini"));
        lineaRegreso.PlantaFactura = (await obtenerPlanta(busquedaFactura!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombrepl");
        lineaRegreso.VendedorFactura = await obtenerVendedor(busquedaFactura!.getDataValue("clientePlanta_idclientePlanta"));
        lineaRegreso.UsuarioFactura = (await obtenerCliente(busquedaFactura!.getDataValue("clientePlanta_idclientePlanta")))!.getDataValue("nombre");
        
        lineaRegreso.montoFactura = await getPrecioFactura(listaFactura![m].getDataValue("idfactura"));
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
}
