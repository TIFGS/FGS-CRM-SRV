import {Request,Response} from 'express';
import {Op} from 'sequelize';

import Oportunidad from '../models/oportunidad';
import oportunidadHistorico from '../models/oportunidadHistorico';
import oportunidadActividad from '../models/oportunidadActividad';

import Prospeccion from '../models/prospeccion';
import prospeccionHistorico from '../models/prospeccionHistorico';
import prospeccionActividad from '../models/prospeccionActividad';

import Cotizacion from '../models/cotizacion';
import cotizacionHistorico from '../models/cotizacionHistorico';
import cotizacionActividad from '../models/cotizacionActividad';

import Prealta from '../models/prealta';
import prealtaHistorico from '../models/prealtaHistorico';
import prealtaActividad from '../models/prealtaActividad';

import Alta from '../models/alta';
import altaHistorico from '../models/altaHistorico';
import altaActividad from '../models/altaActividad';

import Factura from '../models/factura';
import facturaHistorico from '../models/facturaHistorico'
import facturaActividad from '../models/facturaActividad';;

import cotizacionesPrealta from '../models/cotizacionesPrealta';
import cotizacionesAlta from '../models/cotizacionesAlta';
import prealtaAlta from '../models/prealtaAlta';
import altaFactura from '../models/altaFactura';

import Cliente from '../models/cliente';
import planta from '../models/planta';
import vendedor from '../models/vendedor';
import partes from '../models/partes';
import clientePlanta from '../models/clientePlanta';


export interface documentoDespliegue{
    documento:any,
    granTotal:number,    
}

export interface PreAltaDespliegue{
    documento:any,
    granTotal:number,
    historico?:any[],
    clientePlanta:any,
    planta:any,
    vendedor:any,
    cliente:any,
   
}

export interface AltaDespliegue{
    documento:any,
    granTotal:number,
    historico?:any[],
    clientePlanta:any,
    planta:any,
    vendedor:any,
    cliente:any,
}
   


export interface FacturaDespliegue{
    documento:any,
    granTotal:number,
    historico?:any[],
    clientePlanta:any,
    planta:any,
    vendedor:any,
    cliente:any,
    
}


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

export const tableroOportunidad = async (req:Request,res:Response)=>{
    const { id } = req.params;
    let regreso:documentoDespliegue[] = [];
    let documentos:any[] = [];
    let modelo = [
        {
            model: oportunidadHistorico,
            as: 'historicoOportunidades',
            include:[
                {
                    model:partes,
                    as:'parte',
                }
            ],
        },
        {
            model: oportunidadActividad,
            as: 'actividadesOportunidades',
        },
        {
            model: clientePlanta,
            as: 'clientePlanta',
            include: [
                {
                    model: planta,
                    as: 'planta'
                },
                {
                    model: vendedor,
                    as: 'vendedor'
                },
                {
                    model: Cliente,
                    as: 'cliente'
                },
            ]
        },
    ];
    //console.log("id",id);
    if(id == 'All'){
        documentos = await Oportunidad.findAll({
            include: modelo,
        }).finally();
        //console.log("documentos",documentos);
        
    }else{
        let ids = JSON.parse(id);
        documentos = await Oportunidad.findAll({ 
            where: { clientePlanta_idclientePlanta:{ [Op.in] : ids} },
            include: modelo,
        }).finally();
    }
    documentos.map((documento)=>{
        regreso.push({
            documento: documento,
            granTotal: 0,
        });
    });
    res.json(regreso);
}

export const tableroProspeccion = async (req:Request,res:Response)=>{
    const { id } = req.params;
    let regreso:documentoDespliegue[] = [];
    let documentos:any[] = [];
    let modelo = [
        {
            model: prospeccionHistorico,
            as: 'historicosProspecciones',
            include:[
                {
                    model:partes,
                    as:'parte',
                }
            ],
        },
        {
            model: prospeccionActividad,
            as: 'actividadesProspecciones',
        },
        {
            model: clientePlanta,
            as: 'clientePlanta',
            include: [
                {
                    model: planta,
                    as: 'planta'
                },
                {
                    model: vendedor,
                    as: 'vendedor'
                },
                {
                    model: Cliente,
                    as: 'cliente'
                },
            ]
        },
    ];
    //console.log("id",id);
    if(id == 'All'){
        documentos = await Prospeccion.findAll({
            include: modelo,
        }).finally();
        //console.log("documentos",documentos);
        
    }else{
        let ids = JSON.parse(id);
        documentos = await Prospeccion.findAll({ 
            where: { clientePlanta_idclientePlanta:{ [Op.in] : ids} },
            include: modelo,
        }).finally();
    }
    documentos.map((documento)=>{
        regreso.push({
            documento: documento,
            granTotal: 0,
        });
    });
    res.json(regreso);
}

export const tableroCotizacion = async (req:Request,res:Response)=>{
    const { id } = req.params;
    let regreso:documentoDespliegue[] = [];
    let documentos:any[] = [];
    let modelo = [
        {
            model: cotizacionHistorico,
            as: 'historicosCotizaciones',
            include:[
                {
                    model:partes,
                    as:'parte',
                }
            ],
        },
        {
            model: cotizacionActividad,
            as: 'actividadesCotizaciones',
        },
        {
            model: clientePlanta,
            as: 'clientePlanta',
            include: [
                {
                    model: planta,
                    as: 'planta'
                },
                {
                    model: vendedor,
                    as: 'vendedor'
                },
                {
                    model: Cliente,
                    as: 'cliente'
                },
            ]
        },
    ];
    //console.log("id",id);
    if(id == 'All'){
        documentos = await Cotizacion.findAll({
            include: modelo,
        }).finally();
        //console.log("documentos",documentos);
        
    }else{
        let ids = JSON.parse(id);
        documentos = await Cotizacion.findAll({ 
            where: { clientePlanta_idclientePlanta:{ [Op.in] : ids} },
            include: modelo,
        }).finally();
    }
    //console.log(documentos);
    //documentos.map(async (documento)=>{
    for(let i = 0; i < documentos.length; i++){
        const documento = documentos[i];
        //console.log("Documento",documento);
        const maxVersion = await cotizacionHistorico.max('version', { where: { cotizaciones_idcotizaciones: documento.getDataValue('idcotizaciones') } }).finally();
        let granTotal:number = 0;
        //console.log("historico",documento.getDataValue('historicosCotizaciones'));
        documento.getDataValue('historicosCotizaciones')!.forEach((cot:any)=>{
            if(cot.getDataValue('version') == maxVersion){
                granTotal +=  Number(cot.getDataValue('precioTotal'));
            }
        });
        regreso.push({
            documento: documento,
            granTotal: granTotal,
        });
    };
    res.json(regreso);
}

export const tableroPrealta = async (req:Request,res:Response)=>{
    const { id } = req.params;
    let regreso:documentoDespliegue[] = [];
    let documentos:any[] = [];
    let modelo = [
        {
            model: prealtaHistorico,
            as: 'historicosPrealta',
            include:[
                {
                    model:partes,
                    as:'parte',
                
                }
            ],
        },
        {
            model: prealtaActividad,
            as: 'actividadesPrealta',
        },
        {
            model: clientePlanta,
            as: 'clientePlanta',
            include: [
                {
                    model: planta,
                    as: 'planta'
                },
                {
                    model: vendedor,
                    as: 'vendedor'
                },
                {
                    model: Cliente,
                    as: 'cliente'
                },
            ]
        },
    ];
    //console.log("id",id);
    if(id == 'All'){
        documentos = await Prealta.findAll({
            include: modelo,
        }).finally();
        //console.log("documentos",documentos);
        
    }else{
        let ids = JSON.parse(id);
        documentos = await Prealta.findAll({ 
            where: { clientePlanta_idclientePlanta:{ [Op.in] : ids} },
            include: modelo,
        }).finally();
    }
    //console.log(documentos);
    //documentos.map(async (documento)=>{
    for(let i = 0; i < documentos.length; i++){
        const documento = documentos[i];
        //console.log("Documento",documento);
        const maxVersion = await prealtaHistorico.max('version', { where: { prealta_idprealta: documento.getDataValue('idprealta') } }).finally();
        let granTotal:number = 0;
        //console.log("historico",documento.getDataValue('historicosCotizaciones'));
        documento.getDataValue('historicosPrealta')!.forEach((cot:any)=>{
            if(cot.getDataValue('version')==1){
                granTotal +=  Number(cot.getDataValue('precioTotal'));
            }
        });
        regreso.push({
            documento: documento,
            granTotal: granTotal,
        });
    };
    res.json(regreso);
}

export const tableroAlta = async (req:Request,res:Response)=>{
    const { id } = req.params;
    let regreso:documentoDespliegue[] = [];
    let documentos:any[] = [];
    let modelo = [
        {
            model: altaHistorico,
            as: 'historicosAlta',
            include:[
                {
                    model:partes,
                    as:'parte',
                }
            ],
        },
        {
            model: altaActividad,
            as: 'actividadesAlta',
        },
        {
            model: clientePlanta,
            as: 'clientePlanta',
            include: [
                {
                    model: planta,
                    as: 'planta'
                },
                {
                    model: vendedor,
                    as: 'vendedor'
                },
                {
                    model: Cliente,
                    as: 'cliente'
                },
            ]
        },
    ];
    if(id == 'All'){
        documentos = await Alta.findAll({
            include: modelo,
        }).finally();
        //console.log("documentos",documentos);
        
    }else{
        let ids = JSON.parse(id);
        documentos = await Alta.findAll({ 
            where: { clientePlanta_idclientePlanta:{ [Op.in] : ids} },
            include: modelo,
        }).finally();
    }
    //console.log(documentos);
    //documentos.map(async (documento)=>{
    for(let i = 0; i < documentos.length; i++){
        const documento = documentos[i];
        //console.log("Documento",documento);
        const maxVersion = await altaHistorico.max('version', { where: { alta_idAlta: documento.getDataValue('idalta') } }).finally();
        let granTotal:number = 0;
        //console.log("historico",documento.getDataValue('historicosCotizaciones'));
        documento.getDataValue('historicosAlta')!.forEach((cot:any)=>{
            if(cot.getDataValue('version')==1){
                granTotal +=  Number(cot.getDataValue('precioTotal'));
            }
        });
        regreso.push({
            documento: documento,
            granTotal: granTotal,
        });
    };
    res.json(regreso);
}

export const tableroFactura = async (req:Request,res:Response)=>{
    const { id } = req.params;
    let regreso:documentoDespliegue[] = [];
    let documentos:any[] = [];
    let modelo = [
        {
            model: facturaHistorico,
            as: 'historicosFacturas',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: facturaActividad,
            as: 'actividadesFactura',
        },
        {
            model: clientePlanta,
            as: 'clientePlanta',
            include: [
                {
                    model: planta,
                    as: 'planta'
                },
                {
                    model: vendedor,
                    as: 'vendedor'
                },
                {
                    model: Cliente,
                    as: 'cliente'
                },
            ]
        },
    ];
    //console.log("id",id);
    if(id == 'All'){
        documentos = await Factura.findAll({
            include: modelo,
        }).finally();
        //console.log("documentos",documentos);
        
    }else{
        let ids = JSON.parse(id);
        documentos = await Factura.findAll({ 
            where: { clientePlanta_idclientePlanta:{ [Op.in] : ids} },
            include: modelo,
        }).finally();
    }
    //console.log(documentos);
    //documentos.map(async (documento)=>{
    for(let i = 0; i < documentos.length; i++){
        const documento = documentos[i];
        //console.log("Documento",documento);
        const maxVersion = await facturaHistorico.max('version', { where: { factura_idfactura: documento.getDataValue('idfactura') } }).finally();
        let granTotal:number = 0;
        //console.log("historico",documento.getDataValue('historicosCotizaciones'));
        documento.getDataValue('historicosFacturas')!.forEach((cot:any)=>{
            if(cot.getDataValue('version') == maxVersion){
                granTotal +=  Number(cot.getDataValue('precioTotal'));
            }
        });
        regreso.push({
            documento: documento,
            granTotal: granTotal,
        });
    };
    res.json(regreso);
}

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


