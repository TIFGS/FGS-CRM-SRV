import { DateTime } from 'luxon';
import {Request,Response} from 'express';
import Oportunidad from '../models/oportunidad';
import clientePlanta from '../models/clientePlanta';
import planta from '../models/planta';
import cliente from '../models/cliente';
import vendedor from '../models/vendedor';
import partes from '../models/partes';
import oportunidadHistorico from '../models/oportunidadHistorico';
import oportunidadActividad from '../models/oportunidadActividad';

export const getAllDependencias = async (req:Request, res:Response) => {
    const list = await Oportunidad.findAll({
        order: [['idoportunidades', 'DESC']],
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
            model: oportunidadHistorico,
            as: 'historicoOportunidades',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: oportunidadActividad,
            as:'actividadesOportunidades',
        },
        ],
    });
    res.json(list); 
}

export const getAll = async (req:Request, res:Response) => {
    const list = await Oportunidad.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const oportunidad = await Oportunidad.findByPk(id);
    if(oportunidad)
        res.json(oportunidad);
    else{
        res.status(404).json({
            msg: `No existe una oportunidad con ese id ${id}`
        });
    }
}

export const getByIdDependencias = async (req:Request,res:Response) => {
    const { id } = req.params;
    const oportunidad = await Oportunidad.findByPk(id,{
        order: [['idoportunidades', 'DESC']],
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
            model: oportunidadHistorico,
            as: 'historicoOportunidades',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: oportunidadActividad,
            as:'actividadesOportunidades',
        },
        ],
    });
    if(oportunidad)
        res.json(oportunidad);
    else{
        res.status(404).json({
            msg: `No existe una oportunidad con ese id ${id}`
        });
    }
}

export const getByclientePlanta_idclientePlanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const oportunidad =await Oportunidad.findAll({where:{clientePlanta_idclientePlanta:id}});
    if(oportunidad){
        res.json(oportunidad);
    }else{
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
}

export const deleteOportunidad = async (req:Request,res:Response) => {
    const { id } = req.params;
    const oportunidad = await Oportunidad.findByPk(id);
    if(!oportunidad){
        res.status(404).json({
            msg:`No se encontro ninguna oportunidad con id ${id}`
        })
    }else{
        await oportunidad.destroy();
        res.json({
            msg:`La oportunidad fue eliminada con exito!`
        })
    }
}

export const postOportunidad = async (req:Request,res:Response) => {
    const { body } = req;
    const oportunidad = await Oportunidad.create(body )
    res.json({
        response: oportunidad,
        msg: 'La oportunidad se agrego con exito!'
    })
}

export const postOportunidadDependencias =  async (req:Request,res:Response) => {
    let condGuardado: boolean = true, logGuardado: string[] = [];
    const { body } = req;
    let idD = -1;
    if(body.idoportunidades != null){
        const doc =  await Oportunidad.findByPk(body.idoportunidades).finally();
        if(doc != null){
            try{
                const update = await doc.update(body).finally();
                //console.log("Respuesta",update);
                if(update){
                    idD = update!.getDataValue('idoportunidades');
                    logGuardado.push("Oportunidades actualizada con exito");
                }else{
                    condGuardado = false;
                    logGuardado.push("Error en actualizar al actualiza la Oportunidades"+body.idoportunidades+"\n");
                }
                idD = update!.getDataValue('idoportunidades');
                for(let i = 0; i < Object.keys(body.historicoOportunidades).length; i++){
                    //console.log("i "+i,body.historicoOportunidades[i].idhistoricoOportunidades,(body.historicoOportunidades[i].idhistoricoOportunidades != undefined));
                    if(body.historicoOportunidades[i].idhistoricoOportunidades != undefined){
                        const historico = await oportunidadHistorico.findByPk(body.historicoOportunidades[i].idhistoricoOportunidades);
                        if(historico){
                            try{
                                await historico!.update(body.historicoOportunidades[i]);
                                if(historico){
                                    logGuardado.push("Historico actualizado con exito " + body.historicoOportunidades[i].idhistoricoOportunidades);
                                }else{
                                    logGuardado.push("Error al actualizar el historico "+body.historicoOportunidades[i].idhistoricoOportunidades+"\n");
                                }
                            }catch(error){
                                console.log("Error al actualizar el historico "+obtenerFechaActualMX(),error);
                                logGuardado.push("Error al actualizar el historico "+body.historicoOportunidades[i].idhistoricoOportunidades+" error:"+error+"\n");
                            }
                        }else{
                            logGuardado.push("Error al actualizar el historico "+body.historicoOportunidades[i].idhistoricoOportunidades+" no existe\n");
                        }
                    }else{
                        let historico = {...body.historicoOportunidades[i], oportunidades_idoportunidades: idD};
                        try{
                            const respuesta = await oportunidadHistorico.create(historico);
                            if(respuesta){                        
                                logGuardado.push("Historico creado con exito " + respuesta.getDataValue('idhistoricoOportunidades'));
                                
                            }else{
                                logGuardado.push("Error al crear el historico "+i+"\n");
                            }
                        }catch(error){
                            console.log("Error al crear el historico"+obtenerFechaActualMX(),error);
                            logGuardado.push("Error al crear el historico "+i+" error:"+error+"\n");
                        }
                    }
                }
                for(let i = 0; i < Object.keys(body.actividadesOportunidades).length; i++){
                    if(body.actividadesOportunidades[i].idactividadesOportunidades != null){
                        const actividad = await oportunidadActividad.findByPk(body.actividadesOportunidades[i].idactividadesOportunidades);
                        if(actividad){
                            try{
                                await actividad!.update(body.actividadesOportunidades[i]);
                                logGuardado.push("Actividad actualizada con exito "+body.actividadesOportunidades[i].idactividadesOportunidades);
                            }catch(error){
                                console.log("Error al actualizar la actividad",error);
                                logGuardado.push("Error al actualizar la actividad "+body.actividadesOportunidades[i].idactividadesOportunidades + " error:"+error+"\n");
                            }
                        }else{
                            logGuardado.push("Error al actualizar la actividad "+body.actividadesOportunidades[i].idactividadesOportunidades + " no existe\n");
                        }
                    }else{
                        let actividad = {...body.actividadesOportunidades[i], oportunidades_idoportunidades: idD};
                        try{
                            const respuesta = await oportunidadActividad.create(actividad);
                            if(respuesta){
                                /**Ah segun no existe idactividadesOportunidades en respuesta*/
                                logGuardado.push("Actividad creada con exito " + respuesta.getDataValue('idactividadesOportunidades'));
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
            }catch(error){
                console.error("Error al actualizar la Oportunidades"+obtenerFechaActualMX(),error);
                condGuardado = false;
                logGuardado.push("Error en actualizar al actualiza la Oportunidades"+body.idoportunidades+" error: "+JSON.stringify(error)+"\n");
                logGuardado.push("No se relizaron cambios en la Oportunidades\n");
            }
        }else{
            condGuardado = false;
            logGuardado.push("Error en actualizar al obtener la Oportunidades"+body.idoportunidades+ "\n");
        }    
                  
    }else{
        let body2 = {...body,idoportunidades: undefined};
        const doc = await Oportunidad.build(body2,{
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
                model: oportunidadHistorico,
                as: 'historicoOportunidades',
            },
            {
                model: oportunidadActividad,
                as:'actividadesOportunidades',
            },
            ]
        });
        try{
            let respuesta = await doc!.save().finally();
            if(respuesta){
                idD = respuesta!.getDataValue('idoportunidades');
                logGuardado.push("Oportunidades creada con exito "+idD);
            }else{
                condGuardado = false;
                logGuardado.push("Error al guardar la Oportunidades"+body.idoportunidades+"\n");
            }
            //console.log("respuesta",respuesta);            
        }catch(error){
            console.error("Error al guardar la Oportunidades "+obtenerFechaActualMX(),error);
            logGuardado.push("Error al guardar la Oportunidades "+body.idoportunidades+" error:"+error+"\n");
            condGuardado = false;
        }
        idD = doc!.getDataValue('idoportunidades');
    }
    
    const docDB = await Oportunidad.findByPk(idD,{
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
            model: oportunidadHistorico,
            as: 'historicoOportunidades',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: oportunidadActividad,
            as:'actividadesOportunidades',
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


export const updateOportunidad = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const oportunidad = await Oportunidad.findByPk(id);
    if(oportunidad){
       await oportunidad.update(body);
       res.json({
            msg:'La oportunidad se actualizo con exito!',
            response: oportunidad,
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun oportunidad con id ${id}`
        })
    }
}

export const getResumen = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const oportunidad_list = await Oportunidad.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (oportunidad_list.length > 0) {
      const Oportunidades = oportunidad_list.map((item) => item.getDataValue('probabilidad'));
      resumen[0] = Oportunidades.filter((probabilidad) => probabilidad === 0).length;
      resumen[1] = Oportunidades.filter((probabilidad) => probabilidad === 1).length;
      resumen[2] = Oportunidades.filter((probabilidad) => probabilidad === 2).length;
    } 
    res.json(resumen);    
}
  
