import { DateTime } from 'luxon';
import {Request,Response} from 'express';
import Cotizacion from '../models/cotizacion';
import clientePlanta from '../models/clientePlanta';
import planta from '../models/planta';
import cliente from '../models/cliente';
import vendedor from '../models/vendedor';
import partes from '../models/partes';
import cotizacionHistorico from '../models/cotizacionHistorico';
import cotizacionActividad from '../models/cotizacionActividad';

export const getAll = async (req:Request, res:Response) => {
    const list = await Cotizacion.findAll();
    res.json(list); 
}

export const getAllDependencias = async (req:Request, res:Response) => {
    const list = await Cotizacion.findAll({
        order: [['idcotizaciones', 'DESC']],
        include: [
        {
            model: clientePlanta,
            as: 'clientePlanta',
            include:[
                {
                    model: planta,
                    as: 'planta'
                },
                {
                    model: cliente,
                    as: 'cliente'
                },
                {
                    model: vendedor,
                    as: 'vendedor'
                },
            ],
        },
        {
            model: cotizacionHistorico,
            as: 'historicosCotizaciones',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: cotizacionActividad,
            as: 'actividadesCotizaciones',
        },
        ],
    });
    res.json(list); 
}

export const getByIdDependencias = async (req:Request,res:Response) => {
    const { id } = req.params;
    const cotizacion =await Cotizacion.findByPk(id,
        {
            order: [['idcotizaciones', 'DESC']],
            include: [
            {
                model: clientePlanta,
                as: 'clientePlanta',
                include:[
                    {
                        model: planta,
                        as: 'planta'
                    },
                    {
                        model: cliente,
                        as: 'cliente'
                    },
                    {
                        model: vendedor,
                        as: 'vendedor'
                    },
                ],
            },
            {
                model: cotizacionHistorico,
                as: 'historicosCotizaciones',
                include:[
                    {
                        model:partes,
                        as: 'parte',
                    }
                ],
            },
            {
                model: cotizacionActividad,
                as: 'actividadesCotizaciones',
            },
            ],
        });
    if(cotizacion){
        res.json(cotizacion);
    }else{
        console.error(`No existe una alta con ese id ${id}`,obtenerFechaActualMX());
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const cotizacion =await Cotizacion.findByPk(id);
    if(cotizacion){
        res.json(cotizacion);
    }else{
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
}

export const getByclientePlanta_idclientePlanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const cotizacion =await Cotizacion.findAll({where:{clientePlanta_idclientePlanta:id}});
    if(cotizacion){
        res.json(cotizacion);
    }else{
        console.error(`No existe una alta con ese id ${id}`,obtenerFechaActualMX());
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
}

export const deleteCotizacion = async (req:Request,res:Response) => {
    const { id } = req.params;
    const cotizacion = await Cotizacion.findByPk(id);
    if(!cotizacion){
        console.error(`No se encontro ningun permiso con id ${id}`,obtenerFechaActualMX());
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }else{
        await cotizacion.destroy();
        res.json({
            msg:`El permiso fue eliminado con exito!`
        })
    }
}

export const postCotizacionDependencias =  async (req:Request,res:Response) => {
    let condGuardado: boolean = true, logGuardado: string[] = [];
    const { body } = req;
    let idCotizacion = -1;
    if(body.idcotizaciones != null){
        const cotizacion =  await Cotizacion.findByPk(body.idcotizaciones).finally();
        //console.log("Cot buscada");        
        if(cotizacion != null){
            try{
                const update = await cotizacion.update(body).finally();
                //console.log("Respuesta",update);
                if(update){
                    idCotizacion = update!.getDataValue('idcotizaciones');
                    logGuardado.push("Cotizacion actualizada con exito");
                }else{
                    condGuardado = false;
                    logGuardado.push("Error en actualizar al actualiza la cotizacion"+body.idcotizaciones+"\n");
                }
                idCotizacion = update!.getDataValue('idcotizaciones');
            }catch(error){
                console.log("Error al actualizar la cotizacion"+obtenerFechaActualMX(),error);
                condGuardado = false;
                logGuardado.push("Error en actualizar al actualiza la cotizacion"+body.idcotizaciones+" error: "+JSON.stringify(error)+"\n");
            }
        }else{
            condGuardado = false;
            logGuardado.push("Error en actualizar al obtener la cotizacion"+body.idcotizaciones+ "\n");
        }
        if(condGuardado){
            for(let i = 0; i < Object.keys(body.historicosCotizaciones).length; i++){
                if(body.historicosCotizaciones[i].idhistoricosCotizaciones != null){
                    const historico = await cotizacionHistorico.findByPk(body.historicosCotizaciones[i].idhistoricosCotizaciones);
                    if(historico){
                        try{
                            await historico!.update(body.historicosCotizaciones[i]);
                            if(historico){
                                logGuardado.push("Historico actualizado con exito " + body.historicosCotizaciones[i].idhistoricosCotizaciones);
                            }else{
                                logGuardado.push("Error al actualizar el historico "+body.historicosCotizaciones[i].idhistoricosCotizaciones+"\n");
                            }
                        }catch(error){
                            console.log("Error al actualizar el historico "+obtenerFechaActualMX(),error);
                            logGuardado.push("Error al actualizar el historico "+body.historicosCotizaciones[i].idhistoricosCotizaciones+" error:"+error+"\n");
                        }
                    }else{
                        logGuardado.push("Error al actualizar el historico "+body.historicosCotizaciones[i].idhistoricosCotizaciones+" no existe\n");
                    }
                }else{
                    let historico = {...body.historicosCotizaciones[i], cotizaciones_idcotizaciones: idCotizacion};
                    try{
                        const respuesta = await cotizacionHistorico.create(historico);
                        if(respuesta){
                            /**Ah segun no existe idhistoricosCotizaciones en respuesta*/
                            logGuardado.push("Historico creado con exito " + respuesta.getDataValue('idhistoricosCotizaciones'));
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
            for(let i = 0; i < Object.keys(body.actividadesCotizaciones).length; i++){
                if(body.actividadesCotizaciones[i].idactividadesCotizaciones != null){
                    const actividad = await cotizacionActividad.findByPk(body.actividadesCotizaciones[i].idactividadesCotizaciones);
                    if(actividad){
                        try{
                            await actividad!.update(body.actividadesCotizaciones[i]);
                            logGuardado.push("Actividad actualizada con exito "+body.actividadesCotizaciones[i].idactividadesCotizaciones);
                        }catch(error){
                            console.log("Error al actualizar la actividad",error);
                            logGuardado.push("Error al actualizar la actividad "+body.actividadesCotizaciones[i].idactividadesCotizaciones + " error:"+error+"\n");
                        }
                    }else{
                        logGuardado.push("Error al actualizar la actividad "+body.actividadesCotizaciones[i].idactividadesCotizaciones + " no existe\n");
                    }
                }else{
                    let actividad = {...body.actividadesCotizaciones[i], cotizaciones_idcotizaciones: idCotizacion};
                    try{
                        const respuesta = await cotizacionActividad.create(actividad);
                        if(respuesta){
                            /**Ah segun no existe idactividadesCotizaciones en respuesta*/
                            logGuardado.push("Actividad creada con exito " + respuesta.getDataValue('idactividadesCotizaciones'));
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
            logGuardado.push("No se relizaron cambios en la cotizacion\n");
        }        
    }else{
        let body2 = {...body, idcotizaciones: undefined};
        const cotizacion = await Cotizacion.build(body2,{
            include: [
            {
                model: cotizacionHistorico,
                as: 'historicosCotizaciones',
            },
            {
                model: cotizacionActividad,
                as: 'actividadesCotizaciones',
            },
        ]
        });
        try{
            let respuesta = await cotizacion!.save().finally();
            if(respuesta){
                idCotizacion = respuesta!.getDataValue('idcotizaciones');
                logGuardado.push("Cotizacion creada con exito "+idCotizacion);
            }else{
                condGuardado = false;
                logGuardado.push("Error al guardar la cotizacion"+body.idcotizaciones+"\n");
            }
            //console.log("respuesta",respuesta);            
        }catch(error){
            console.error("Error al guardar la cotizacion "+obtenerFechaActualMX(),error);
            logGuardado.push("Error al guardar la cotizacion "+body.idcotizaciones+" error:"+error+"\n");
            condGuardado = false;
        }
        idCotizacion = cotizacion!.getDataValue('idcotizaciones');
    }
    const cotizacionDB = await Cotizacion.findByPk(idCotizacion,{
        order: [['idcotizaciones', 'DESC']],
        include: [
        {
            model: clientePlanta,
            as: 'clientePlanta',
            include:[
                {
                    model: planta,
                    as: 'planta'
                },
                {
                    model: cliente,
                    as: 'cliente'
                },
                {
                    model: vendedor,
                    as: 'vendedor'
                },
            ],
        },
        {
            model: cotizacionHistorico,
            as: 'historicosCotizaciones',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: cotizacionActividad,
            as: 'actividadesCotizaciones',
        },
        ],
    });
    res.json({
        response: cotizacionDB,
        msg: logGuardado,
    })
}

export const postCotizacion = async (req:Request,res:Response) => {
    const { body } = req;
    let idCotizacion = -1;
    if(body.idcotizaciones == null){
        const cotizacion = await Cotizacion.build(body);
        await cotizacion!.save().
        then((cotizacion)=>{
            res.json({
                response: cotizacion,
                msg: 'La cotizacion se agrego con exito!'
            })
        }).
        catch(error=>{
            console.error("Error al guardar la cotizacion, ya existe",obtenerFechaActualMX());
            console.error(error,body);
            res.status(400).json({
                msg:`Error al guardar la cotización ${error}`
            });
        })
    }else{
        console.error("Error al guardar la cotizacion, ya existe",obtenerFechaActualMX());
        console.error(body);
        res.status(400).json({
            msg:'Error al guardar la cotizacion ya existe'
        })
    }
}

export const updateCotizacion = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const cotizacion = await Cotizacion.findByPk(id);
    if(cotizacion){
       await cotizacion.update(body);
       res.json({
            msg:'La cotización se actualizo con exito!',
            response: cotizacion
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ninguna catizacion con id ${id}`
        })
    }
}

export const getResumen = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const cotizacion_list = await Cotizacion.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (cotizacion_list.length > 0) {
      const cotizaciones = cotizacion_list.map((alta) => alta.getDataValue('probabilidad'));
      resumen[0] = cotizaciones.filter((probabilidad) => probabilidad === 0).length;
      resumen[1] = cotizaciones.filter((probabilidad) => probabilidad === 1).length;
      resumen[2] = cotizaciones.filter((probabilidad) => probabilidad === 2).length;
    } 
    res.json(resumen);
}

export const actualizacionPrecios = async (req: Request, res: Response)=>{
 

}

function obtenerFechaActualMX() {
    const mexicoCity = DateTime.now().setZone('America/Mexico_City');
    return mexicoCity.toFormat('yyyy-LL-dd HH:mm:ss');
}
