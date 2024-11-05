import { DateTime } from 'luxon';
import {Op} from 'sequelize';
import {Request,Response} from 'express';
import Alta from '../models/alta';
import clientePlanta from '../models/clientePlanta';
import planta from '../models/planta';
import cliente from '../models/cliente';
import vendedor from '../models/vendedor';
import partes from '../models/partes';
import altaHistorico from '../models/altaHistorico';
import altaActividad from '../models/altaActividad';


export const getAll = async (req:Request, res:Response) => {
    const list = await Alta.findAll();
    res.json(list); 
}

export const getAllDependencias = async (req:Request, res:Response) => {    
    const list = await Alta.findAll({
        order: [['idalta', 'DESC']],
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
            model: altaHistorico,
            as: 'historicosAlta',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: altaActividad,
            as: 'actividadesAlta',
        },
        ],
    });
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const alta =await Alta.findByPk(id);
    if(alta){
        res.json(alta);
    }else{
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
}

export const getByIdDependencias = async (req:Request,res:Response) => {
    const { id } = req.params;
    const alta =await Alta.findByPk(id,{
        order: [['idalta', 'DESC']],
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
            model: altaHistorico,
            as: 'historicosAlta',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: altaActividad,
            as: 'actividadesAlta',
        },
        ],
    });
    if(alta){
        res.json(alta);
    }else{
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
}

export const getPMA = async (req:Request,res:Response) => {
    const { id } = req.params;
    const alta =await Alta.findAll({
        where:{operacion:{[Op.notIn]:["Solicitud","Terminado","Cancelado"]}},
        order: [['idalta', 'DESC']],
        include: [
        {
            model: altaHistorico,
            as: 'historicosAlta',
            where:{version:{[Op.eq]:[2]}},
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        ],
    });

    if(alta){
        res.json(alta);
    }else{
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
}

export const getByclientePlanta_idclientePlanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const alta =await Alta.findAll({where:{clientePlanta_idclientePlanta:id}});
    if(alta){
        res.json(alta);
    }else{
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
}

export const deleteAlta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const alta = await Alta.findByPk(id);
    if(!alta){
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }else{
        await alta.destroy();
        res.json({
            msg:`El permiso fue eliminado con exito!`
        })
    }    
}

export const postAlta = async (req:Request,res:Response) => {
    const { body } = req;
    const alta =  await Alta.create(body)
    res.json({
        response: alta,
        msg: 'El alta se agrego con exito!'
    })
}

export const postAltaDependencias =  async (req:Request,res:Response) => {
    let condGuardado: boolean = true, logGuardado: string[] = [];
    const { body } = req;
    let idD = -1;
    if(body.idalta != null){
        const doc =  await Alta.findByPk(body.idalta).finally();
        if(doc != null){
            try{
                const update = await doc.update(body).finally();
                //console.log("Respuesta",update);
                if(update){
                    idD = update!.getDataValue('idalta');
                    logGuardado.push("Alta actualizada con exito");
                }else{
                    condGuardado = false;
                    logGuardado.push("Error en actualizar al actualiza la alta"+body.idalta+"\n");
                }
                idD = update!.getDataValue('idalta');
                console.log("idD",idD);
                for(let i = 0; i < Object.keys(body.historicosAlta).length; i++){
                    if(body.historicosAlta[i].idhistoricosAlta != null){
                        const historico = await altaHistorico.findByPk(body.historicosAlta[i].idhistoricosAlta);
                        if(historico){
                            try{
                                await historico!.update(body.historicosAlta[i]);
                                if(historico){
                                    logGuardado.push("Historico actualizado con exito " + body.historicosAlta[i].idhistoricosAlta);
                                }else{
                                    logGuardado.push("Error al actualizar el historico "+body.historicosAlta[i].idhistoricosAlta+"\n");
                                }
                            }catch(error){
                                console.log("Error al actualizar el historico "+obtenerFechaActualMX(),error);
                                logGuardado.push("Error al actualizar el historico "+body.historicosAlta[i].idhistoricosAlta+" error:"+error+"\n");
                            }
                        }else{
                            logGuardado.push("Error al actualizar el historico "+body.historicosAlta[i].idhistoricosAlta+" no existe\n");
                        }
                    }else{
                        let historico = {...body.historicosAlta[i], alta_idAlta: idD, parte:{}};
                        console.log("historico",historico);
                        try{
                            const respuesta = await altaHistorico.create(historico);
                            if(respuesta){
                                /**Ah segun no existe idhistoricosAlta en respuesta*/
                                logGuardado.push("Historico creado con exito " + respuesta.getDataValue('idhistoricosAlta'));
                                //console.log("Historico creado con exito",altaHistorico);
                                
                            }else{
                                logGuardado.push("Error al crear el historico "+i+"\n");
                            }
                        }catch(error){
                            console.log("Error al crear el historico"+obtenerFechaActualMX(),error);
                            logGuardado.push("Error al crear el historico "+i+" error:"+error+"\n");
                        }
                    }
                }
                for(let i = 0; i < Object.keys(body.actividadesAlta).length; i++){
                    if(body.actividadesAlta[i].idactividadesAlta != null){
                        const actividad = await altaActividad.findByPk(body.actividadesAlta[i].idactividadesAlta);
                        if(actividad){
                            try{
                                await actividad!.update(body.actividadesAlta[i]);
                                logGuardado.push("Actividad actualizada con exito "+body.actividadesAlta[i].idactividadesAlta);
                            }catch(error){
                                console.log("Error al actualizar la actividad",error);
                                logGuardado.push("Error al actualizar la actividad "+body.actividadesAlta[i].idactividadesAlta + " error:"+error+"\n");
                            }
                        }else{
                            logGuardado.push("Error al actualizar la actividad "+body.actividadesAlta[i].idactividadesAlta + " no existe\n");
                        }
                    }else{
                        let actividad = {...body.actividadesAlta[i], alta_idalta: idD};
                        try{
                            const respuesta = await altaActividad.create(actividad);
                            if(respuesta){
                                /**Ah segun no existe idactividadesAlta en respuesta*/
                                logGuardado.push("Actividad creada con exito " + respuesta.getDataValue('idactividadesAlta'));
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
                console.log("Error al actualizar la alta"+obtenerFechaActualMX(),error);
                condGuardado = false;
                logGuardado.push("Error en actualizar al actualiza la alta"+body.idalta+" error: "+JSON.stringify(error)+"\n");
            }
        }else{
            condGuardado = false;
            logGuardado.push("Error en actualizar al obtener la alta"+body.idalta+ "\n");
        }
    }else{
        console.log("body",body);
        const doc = await Alta.build(body,{
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
                model: altaHistorico,
                as: 'historicosAlta',
            },
            {
                model: altaActividad,
                as: 'actividadesAlta',
            },
            ]
        });
        try{
            let respuesta = await doc!.save().finally();
            if(respuesta){
                idD = respuesta!.getDataValue('idalta');
                logGuardado.push("Alta creada con exito "+idD);
            }else{
                condGuardado = false;
                logGuardado.push("Error al guardar la alta"+body.idalta+"\n");
            }
            //console.log("respuesta",respuesta);            
        }catch(error){
            console.error("Error al guardar la alta "+obtenerFechaActualMX(),error);
            logGuardado.push("Error al guardar la alta "+body.idalta+" error:"+error+"\n");
            condGuardado = false;
        }
        idD = doc!.getDataValue('idalta');
    }
    
    const docDB = await Alta.findByPk(idD,{
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
            model: altaHistorico,
            as: 'historicosAlta',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: altaActividad,
            as: 'actividadesAlta',
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

export const updateAlta = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const alta = await Alta.findByPk(id);
    if(alta){
       await alta.update(body);
       res.json({
            msg:'El Alta se actualizo con exito!',
            response:alta
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }
}

export const getResumen = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const alta_list = await Alta.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (alta_list.length > 0) {
      const altas = alta_list.map((alta) => alta.getDataValue('probabilidad'));
      resumen[0] = altas.filter((probabilidad) => probabilidad === 0).length;
      resumen[1] = altas.filter((probabilidad) => probabilidad === 1).length;
      resumen[2] = altas.filter((probabilidad) => probabilidad === 2).length;
    } 
    res.json(resumen);
    
  };
  
  
  
  

  



