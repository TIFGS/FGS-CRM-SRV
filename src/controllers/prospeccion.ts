import { DateTime } from 'luxon';
import {Request,Response} from 'express';
import Prospeccion from '../models/prospeccion';
import clientePlanta from '../models/clientePlanta';
import planta from '../models/planta';
import cliente from '../models/cliente';
import vendedor from '../models/vendedor';
import partes from '../models/partes';
import prospeccionHistorico from '../models/prospeccionHistorico';
import prospeccionActividad from '../models/prospeccionActividad';


export const getAll = async (req:Request, res:Response) => {
    const list = await Prospeccion.findAll();
    res.json(list); 
}

export const getAllDependencias = async (req:Request, res:Response) => {
    const list = await Prospeccion.findAll({
        order: [['idprospecciones', 'DESC']],
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
            model: prospeccionHistorico,
            include:[
                {model:partes,}
            ],
        },
        {
            model: prospeccionActividad,
        },
        ],
    });
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const prospeccion =await Prospeccion.findByPk(id);
    if(prospeccion){
        res.json(prospeccion);
    }else{
        res.status(404).json({
            msg: `No existe una prospección con ese id ${id}`
        });
    }
}

export const getByIdDependencias = async (req:Request,res:Response) => {
    const { id } = req.params;
    const prospeccion =await Prospeccion.findByPk(id,
        {
            order: [['idprospecciones', 'DESC']],
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
                model: prospeccionHistorico,
                as: 'historicosProspecciones',
                include:[
                    {
                        model:partes,
                        as: 'parte',
                    }
                ],
            },
            {
                model: prospeccionActividad,
                as: 'actividadesProspecciones',
            },
            ],
        });
    if(prospeccion){
        res.json(prospeccion);
    }else{
        res.status(404).json({
            msg: `No existe una prospección con ese id ${id}`
        });
    }
}

export const getByclientePlanta_idclientePlanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const prospeccion =await Prospeccion.findAll({where:{clientePlanta_idclientePlanta:id}});
    if(prospeccion){
        res.json(prospeccion);
    }else{
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
}

export const deleteProspeccion = async (req:Request,res:Response) => {
    const { id } = req.params;
    const prospeccion = await Prospeccion.findByPk(id);
    if(!prospeccion){
        res.status(404).json({
            msg:`No se encontro ninguna prospección con id ${id}`
        })
    }else{
        await prospeccion.destroy();
        res.json({
            msg:`La prospección fue eliminada con exito!`
        })
    }
}

export const postProspeccion = async (req:Request,res:Response) => {
    const { body } = req;
    const prospeccion = await Prospeccion.create(body )
    res.json({
        response: prospeccion,
        msg: 'La prospección se agrego con exito!'
    })
}

export const postProspeccionDependencias =  async (req:Request,res:Response) => {
    let condGuardado: boolean = true, logGuardado: string[] = [];
    const { body } = req;
    let idD = -1;
    if(body.idprospecciones != null){
        const doc =  await Prospeccion.findByPk(body.idprospecciones).finally();
        if(doc != null){
            try{
                const update = await doc.update(body).finally();
                //console.log("Respuesta",update);
                if(update){
                    idD = update!.getDataValue('idprospecciones');
                    logGuardado.push("Prospeccion actualizada con exito");
                }else{
                    condGuardado = false;
                    logGuardado.push("Error en actualizar al actualiza la Prospeccion"+body.idprospecciones+"\n");
                }
                idD = update!.getDataValue('idprospecciones');
                for(let i = 0; i < Object.keys(body.historicosProspecciones).length; i++){
                    if(body.historicosProspecciones[i].idhistoricosProspecciones != null){
                        const historico = await prospeccionHistorico.findByPk(body.historicosProspecciones[i].idhistoricosProspecciones);
                        if(historico){
                            try{
                                await historico!.update(body.historicosProspecciones[i]);
                                if(historico){
                                    logGuardado.push("Historico actualizado con exito " + body.historicosProspecciones[i].idhistoricosProspecciones);
                                }else{
                                    logGuardado.push("Error al actualizar el historico "+body.historicosProspecciones[i].idhistoricosProspecciones+"\n");
                                }
                            }catch(error){
                                console.log("Error al actualizar el historico "+obtenerFechaActualMX(),error);
                                logGuardado.push("Error al actualizar el historico "+body.historicosProspecciones[i].idhistoricosProspecciones+" error:"+error+"\n");
                            }
                        }else{
                            logGuardado.push("Error al actualizar el historico "+body.historicosProspecciones[i].idhistoricosProspecciones+" no existe\n");
                        }
                    }else{
                        let historico = {...body.historicosProspecciones[i], prospecciones_idprospecciones: idD};
                        try{
                            const respuesta = await prospeccionHistorico.create(historico);
                            if(respuesta){
                                logGuardado.push("Historico creado con exito " + respuesta.getDataValue('idhistoricosProspecciones'));
                                
                            }else{
                                logGuardado.push("Error al crear el historico "+i+"\n");
                            }
                        }catch(error){
                            console.log("Error al crear el historico"+obtenerFechaActualMX(),error);
                            logGuardado.push("Error al crear el historico "+i+" error:"+error+"\n");
                        }
                    }
                }
                for(let i = 0; i < Object.keys(body.actividadesProspecciones).length; i++){
                    if(body.actividadesProspecciones[i].idactividadesProspecciones != null){
                        const actividad = await prospeccionActividad.findByPk(body.actividadesProspecciones[i].idactividadesProspecciones);
                        if(actividad){
                            try{
                                await actividad!.update(body.actividadesProspecciones[i]);
                                logGuardado.push("Actividad actualizada con exito "+body.actividadesProspecciones[i].idactividadesProspecciones);
                            }catch(error){
                                console.log("Error al actualizar la actividad",error);
                                logGuardado.push("Error al actualizar la actividad "+body.actividadesProspecciones[i].idactividadesProspecciones + " error:"+error+"\n");
                            }
                        }else{
                            logGuardado.push("Error al actualizar la actividad "+body.actividadesProspecciones[i].idactividadesProspecciones + " no existe\n");
                        }
                    }else{
                        let actividad = {...body.actividadesProspecciones[i], prospecciones_idprospecciones: idD};
                        try{
                            const respuesta = await prospeccionActividad.create(actividad);
                            if(respuesta){
                                logGuardado.push("Actividad creada con exito " + respuesta.getDataValue('idactividadesProspecciones'));
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
                console.log("Error al actualizar la Prospeccion"+obtenerFechaActualMX(),error);
                condGuardado = false;
                logGuardado.push("Error en actualizar al actualiza la Prospeccion"+body.idprospecciones+" error: "+JSON.stringify(error)+"\n");
                logGuardado.push("No se relizaron cambios en la Prospeccion\n");
            }
        }else{
            condGuardado = false;
            logGuardado.push("Error en actualizar al obtener la Prospeccion"+body.idprospecciones+ "\n");
            logGuardado.push("No se relizaron cambios en la Prospeccion\n");
        }
        
    }else{
        const doc = await Prospeccion.build(body,{
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
                model: prospeccionHistorico,
                as: 'historicosProspecciones',
            },
            {
                model: prospeccionActividad,
                as: 'actividadesProspecciones',
            },
            ]
        });
        try{
            let respuesta = await doc!.save().finally();
            if(respuesta){
                idD = respuesta!.getDataValue('idprospecciones');
                logGuardado.push("Prospeccion creada con exito "+idD);
            }else{
                condGuardado = false;
                logGuardado.push("Error al guardar la Prospeccion"+body.idprospecciones+"\n");
            }
            //console.log("respuesta",respuesta);            
        }catch(error){
            console.error("Error al guardar la Prospeccion "+obtenerFechaActualMX(),error);
            logGuardado.push("Error al guardar la Prospeccion "+body.idprospecciones+" error:"+error+"\n");
            condGuardado = false;
        }
        idD = doc!.getDataValue('idprospecciones');
    }
    
    const docDB = await Prospeccion.findByPk(idD,{
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
            model: prospeccionHistorico,
            as: 'historicosProspecciones',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: prospeccionActividad,
            as: 'actividadesProspecciones',
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


export const updateProspeccion = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const prospeccion = await Prospeccion.findByPk(id);
    if(prospeccion){
       await prospeccion.update(body);
       res.json({
            msg:'La prospección se actualizo con exito!',
            response:prospeccion
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ninguna prospeccion con id ${id}`
        })
    }
}

export const getResumen = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const prospeccion_list = await Prospeccion.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (prospeccion_list.length > 0) {
      const altas = prospeccion_list.map((item) => item.getDataValue('probabilidad'));
      resumen[0] = altas.filter((probabilidad) => probabilidad === 0).length;
      resumen[1] = altas.filter((probabilidad) => probabilidad === 1).length;
      resumen[2] = altas.filter((probabilidad) => probabilidad === 2).length;
    } 
    res.json(resumen);
    
  };