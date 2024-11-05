import { DateTime } from 'luxon';
import {Request,Response} from 'express';
import Factura from '../models/factura';
import clientePlanta from '../models/clientePlanta';
import planta from '../models/planta';
import cliente from '../models/cliente';
import vendedor from '../models/vendedor';
import partes from '../models/partes';
import facturaHistorico from '../models/facturaHistorico';
import facturaActividad from '../models/facturaActividad';


export const getAll = async (req:Request, res:Response) => {
    const list = await Factura.findAll();
    res.json(list); 
}

export const getAllDependencias = async (req:Request, res:Response) => {
    const list = await Factura.findAll({
        order: [['idfactura', 'DESC']],
        include: [
        {
            model: clientePlanta,
            as: 'clientePlanta',
            include:[
                {
                    model: planta,
                    as: 'planta',
                },
                {
                    model: cliente,
                    as: 'cliente',
                },
                {
                    model: vendedor,
                    as: 'vendedor',
                },
            ],
        },
        {
            model: facturaHistorico,
            as: 'historicosFacturas',
            include:[
                {
                    model:partes,
                    as:'parte',
                }
            ],
        },
        {
            model: facturaActividad,
            as: 'actividadesFacturas',
        },
        ],
    });
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const factura = await Factura.findByPk(id);
    if(factura)
        res.json(factura);
    else{
        res.status(404).json({
            msg: `No existe una factura con ese id ${id}`
        });
    }
}

export const getByIdDependencias = async (req:Request,res:Response) => {
    const { id } = req.params;
    const factura = await Factura.findByPk(id,{
        order: [['idfactura', 'DESC']],
        include: [
        {
            model: clientePlanta,
            as: 'clientePlanta',
            include:[
                {
                    model: planta,
                    as: 'planta',
                },
                {
                    model: cliente,
                    as: 'cliente',
                },
                {
                    model: vendedor,
                    as: 'vendedor',
                },
            ],
        },
        {
            model: facturaHistorico,
            as: 'historicosFacturas',
            include:[
                {
                    model:partes,
                    as:'parte',
                }
            ],
        },
        {
            model: facturaActividad,
            as: 'actividadesFacturas',
        },
        ],
    });
    if(factura)
        res.json(factura);
    else{
        res.status(404).json({
            msg: `No existe una factura con ese id ${id}`
        });
    }
}

export const getByclientePlanta_idclientePlanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const factura =await Factura.findAll({where:{clientePlanta_idclientePlanta:id}});
    if(factura){
        res.json(factura);
    }else{
        res.status(404).json({
            msg: `No existe una Factura con ese id ${id}`
        });
    }
}

export const deleteFactura = async (req:Request,res:Response) => {
    const { id } = req.params;
    const factura = await Factura.findByPk(id);
    if(!factura){
        res.status(404).json({
            msg:`No se encontro ninguna factura con id ${id}`
        })
    }else{
        await factura.destroy();
        res.json({
            msg:`La factura fue eliminada con exito!`
        })
    }
}

export const postFactura = async (req:Request,res:Response) => {
    const { body } = req;
    const factura= await Factura.create(body )
    res.json({
        response: factura,
        msg: 'La factura se agrego con exito!'
    })
}

export const postFacturaDependencias =  async (req:Request,res:Response) => {
    let condGuardado: boolean = true, logGuardado: string[] = [];
    const { body } = req;
    let idD = -1;
    if(body.idfactura != null){
        const doc =  await Factura.findByPk(body.idfactura).finally();
        //console.log("Cot buscada");        
        if(doc != null){
            try{
                const update = await doc.update(body).finally();
                //console.log("Respuesta",update);
                if(update){
                    idD = update!.getDataValue('idfactura');
                    logGuardado.push("Cotizacion actualizada con exito");
                }else{
                    condGuardado = false;
                    logGuardado.push("Error en actualizar al actualiza la factura"+body.idfactura+"\n");
                }
                idD = update!.getDataValue('idfactura');
            }catch(error){
                console.log("Error al actualizar la factura"+obtenerFechaActualMX(),error);
                condGuardado = false;
                logGuardado.push("Error en actualizar al actualiza la factura"+body.idfactura+" error: "+JSON.stringify(error)+"\n");
            }
        }else{
            condGuardado = false;
            logGuardado.push("Error en actualizar al obtener la factura"+body.idfactura+ "\n");
        }              
    }else{
        const doc = await Factura.build(body,{
            include: [
            {
                model: clientePlanta,
                as: 'clientePlanta',
                include:[
                    {
                        model: planta,
                        as: 'planta',
                    },
                    {
                        model: cliente,
                        as: 'cliente',
                    },
                    {
                        model: vendedor,
                        as: 'vendedor',
                    },
                ],
            },
            {
                model: facturaHistorico,
                as: 'historicosFacturas',
                include:[
                    {
                        model:partes,
                        as:'parte',
                    }
                ],
            },
            {
                model: facturaActividad,
                as: 'actividadesFacturas',
            },
            ]
        });
        try{
            let respuesta = await doc!.save().finally();
            if(respuesta){
                idD = respuesta!.getDataValue('idfactura');
                logGuardado.push("Cotizacion creada con exito "+idD);
            }else{
                condGuardado = false;
                logGuardado.push("Error al guardar la factura"+body.idfactura+"\n");
            }
            //console.log("respuesta",respuesta);            
        }catch(error){
            console.error("Error al guardar la factura "+obtenerFechaActualMX(),error);
            logGuardado.push("Error al guardar la factura "+body.idfactura+" error:"+error+"\n");
            condGuardado = false;
        }
        idD = doc!.getDataValue('idfactura');
    }
    if(condGuardado){
        for(let i = 0; i < Object.keys(body.historicosFactura).length; i++){
            if(body.historicosFactura[i].idhistoricosFactura != null){
                const historico = await facturaHistorico.findByPk(body.historicosFactura[i].idhistoricosFactura);
                if(historico){
                    try{
                        await historico!.update(body.historicosFactura[i]);
                        if(historico){
                            logGuardado.push("Historico actualizado con exito " + body.historicosFactura[i].idhistoricosFactura);
                        }else{
                            logGuardado.push("Error al actualizar el historico "+body.historicosFactura[i].idhistoricosFactura+"\n");
                        }
                    }catch(error){
                        console.log("Error al actualizar el historico "+obtenerFechaActualMX(),error);
                        logGuardado.push("Error al actualizar el historico "+body.historicosFactura[i].idhistoricosFactura+" error:"+error+"\n");
                    }
                }else{
                    logGuardado.push("Error al actualizar el historico "+body.historicosFactura[i].idhistoricosFactura+" no existe\n");
                }
            }else{
                let historico = {...body.historicosFactura[i], factura_idfactura: idD};
                try{
                    const respuesta = await facturaHistorico.create(historico);
                    if(respuesta){
                        /**Ah segun no existe idhistoricosFactura en respuesta*/
                        logGuardado.push("Historico creado con exito " + respuesta.getDataValue('idhistoricosFactura'));
                        //console.log("Historico creado con exito",cotizacionHistorico);
                        
                    }else{
                        logGuardado.push("Error al crear el historico "+i+"\n");
                    }
                }catch(error){
                    console.log("Error al crear el historico"+obtenerFechaActualMX(),error);
                    logGuardado.push("Error al crear el historico "+i+" error:"+error+"\n");
                }
            }
        }
        for(let i = 0; i < Object.keys(body.actividadesFactura).length; i++){
            if(body.actividadesFactura[i].idactividadesFactura != null){
                const actividad = await facturaActividad.findByPk(body.actividadesFactura[i].idactividadesFactura);
                if(actividad){
                    try{
                        await actividad!.update(body.actividadesFactura[i]);
                        logGuardado.push("Actividad actualizada con exito "+body.actividadesFactura[i].idactividadesFactura);
                    }catch(error){
                        console.log("Error al actualizar la actividad",error);
                        logGuardado.push("Error al actualizar la actividad "+body.actividadesFactura[i].idactividadesFactura + " error:"+error+"\n");
                    }
                }else{
                    logGuardado.push("Error al actualizar la actividad "+body.actividadesFactura[i].idactividadesFactura + " no existe\n");
                }
            }else{
                let actividad = {...body.actividadesFactura[i], factura_idfactura: idD};
                try{
                    const respuesta = await facturaActividad.create(actividad);
                    if(respuesta){
                        /**Ah segun no existe idactividadesFactura en respuesta*/
                        logGuardado.push("Actividad creada con exito " + respuesta.getDataValue('idactividadesFactura'));
                        //console.log("Actividad creada con exito " , respuesta);
                    }else{
                        logGuardado.push("Error al crear la actividad " +i+ "\n");
                    }
                }catch(error){
                    console.log("Error al crear la actividad",error)
                    logGuardado.push("Error al crear la actividad " + i + " error:" + error + "\n");
                }
            }
        }
        
    }else{
        logGuardado.push("No se relizaron cambios en la factura\n");
    }
    const docDB = await Factura.findByPk(idD,{
        include: [
        {
            model: clientePlanta,
            as: 'clientePlanta',
            include:[
                {
                    model: planta,
                    as: 'planta',
                },
                {
                    model: cliente,
                    as: 'cliente',
                },
                {
                    model: vendedor,
                    as: 'vendedor',
                },
            ],
        },
        {
            model: facturaHistorico,
            as: 'historicosFacturas',
            include:[
                {
                    model:partes,
                    as:'parte',
                }
            ],
        },
        {
            model: facturaActividad,
            as: 'actividadesFacturas',
        },
        ]
    });
    res.json({
        response: docDB,
        msg: logGuardado,
    })
}

function obtenerFechaActualMX() {
    const mexicoCity = DateTime.now().setZone('America/Mexico_City');
    return mexicoCity.toFormat('yyyy-LL-dd HH:mm:ss');
}

export const updateFactura = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const factura = await Factura.findByPk(id);
    if(factura){
       await factura.update(body);
       res.json({
            msg:'La factura se actualizo con exito!',
            response: factura
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun factura con id ${id}`
        })
    }
}

export const getResumen = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const factura_list = await Factura.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (factura_list.length > 0) {
      const factura = factura_list.map((Factura) => Factura.getDataValue('probabilidad'));
      resumen[0] = factura.filter((probabilidad) => probabilidad === 0).length;
      resumen[1] = factura.filter((probabilidad) => probabilidad === 1).length;
      resumen[2] = factura.filter((probabilidad) => probabilidad === 2).length;
    } 
    res.json(resumen);    
};
  
  