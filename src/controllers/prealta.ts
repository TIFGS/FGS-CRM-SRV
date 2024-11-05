import { DateTime } from 'luxon';
import {Request,Response} from 'express';
import Prealta from '../models/prealta';
import clientePlanta from '../models/clientePlanta';
import planta from '../models/planta';
import cliente from '../models/cliente';
import vendedor from '../models/vendedor';
import partes from '../models/partes';
import prealtaHistorico from '../models/prealtaHistorico';
import prealtaActividad from '../models/prealtaActividad';

export const getAll = async (req:Request, res:Response) => {
    const list = await Prealta.findAll();
    res.json(list); 
}

export const getAllDependencias = async (req:Request, res:Response) => {
    const list = await Prealta.findAll({
        order: [['idprealta', 'DESC']],
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
            model: prealtaHistorico,
            as: 'historicosPrealta',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: prealtaActividad,
            as: 'actividadesPrealta',
        },
        ],
    });
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const prealta =await Prealta.findByPk(id);
    if(prealta){
        res.json(prealta);
    }else{
        res.status(404).json({
            msg: `No existe una prealta con ese id ${id}`
        });
    }
}

export const getByIdDependencias = async (req:Request,res:Response) => {
    const { id } = req.params;
    const prealta =await Prealta.findByPk(id,{
        order: [['idprealta', 'DESC']],
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
            model: prealtaHistorico,
            as: 'historicosPrealta',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: prealtaActividad,
            as: 'actividadesPrealta',
        },
        ],
    });
    if(prealta){
        res.json(prealta);
    }else{
        res.status(404).json({
            msg: `No existe una prealta con ese id ${id}`
        });
    }
}

export const getByclientePlanta_idclientePlanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const prealta =await Prealta.findAll({where:{clientePlanta_idclientePlanta:id}});
    if(prealta){
        res.json(prealta);
    }else{
        res.status(404).json({
            msg: `No existe una alta con ese id ${id}`
        });
    }
}

export const deletePrealta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const prealta = await Prealta.findByPk(id);
    if(!prealta){
        res.status(404).json({
            msg:`No se encontro ninguna prealta con id ${id}`
        })
    }else{
        await prealta.destroy();
        res.json({
            msg:`La prealta fue eliminada con exito!`
        })
    }
}

export const postPrealta = async (req:Request,res:Response) => {
    const { body } = req;
    const prealta = await Prealta.create(body )
    res.json({
        response: prealta,
        msg: 'La prealta se agrego con exito!'
    })
}

export const postPrealtaDependencias =  async (req:Request,res:Response) => {
    let condGuardado: boolean = true, logGuardado: string[] = [];
    const { body } = req;
    let idD = -1;
    if(body.idprealta != null){
        const doc =  await Prealta.findByPk(body.idprealta).finally();
        if(doc != null){
            try{
                const update = await doc.update(body).finally();
                //console.log("Respuesta",update);
                if(update){
                    idD = update!.getDataValue('idprealta');
                    logGuardado.push("Prealta actualizada con exito");
                }else{
                    condGuardado = false;
                    logGuardado.push("Error en actualizar al actualiza la Prealta"+body.idprealta+"\n");
                }
                idD = update!.getDataValue('idprealta');
            }catch(error){
                console.log("Error al actualizar la Prealta"+obtenerFechaActualMX(),error);
                condGuardado = false;
                logGuardado.push("Error en actualizar al actualiza la Prealta"+body.idprealta+" error: "+JSON.stringify(error)+"\n");
            }
        }else{
            condGuardado = false;
            logGuardado.push("Error en actualizar al obtener la Prealta"+body.idprealta+ "\n");
        }              
    }else{
        const doc = await Prealta.build(body,{
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
                model: prealtaHistorico,
                as: 'historicosPrealta',
            },
            {
                model: prealtaActividad,
                as: 'actividadesPrealta',
            },
            ]
        });
        try{
            let respuesta = await doc!.save().finally();
            if(respuesta){
                idD = respuesta!.getDataValue('idprealta');
                logGuardado.push("Prealta creada con exito "+idD);
            }else{
                condGuardado = false;
                logGuardado.push("Error al guardar la Prealta"+body.idprealta+"\n");
            }
            //console.log("respuesta",respuesta);            
        }catch(error){
            console.error("Error al guardar la Prealta "+obtenerFechaActualMX(),error);
            logGuardado.push("Error al guardar la Prealta "+body.idprealta+" error:"+error+"\n");
            condGuardado = false;
        }
        idD = doc!.getDataValue('idprealta');
    }
    if(condGuardado){
        for(let i = 0; i < Object.keys(body.historicosPrealta).length; i++){
            if(body.historicosPrealta[i].idhistoricosPrealta != null){
                const historico = await prealtaHistorico.findByPk(body.historicosPrealta[i].idhistoricosPrealta);
                if(historico){
                    try{
                        await historico!.update(body.historicosPrealta[i]);
                        if(historico){
                            logGuardado.push("Historico actualizado con exito " + body.historicosPrealta[i].idhistoricosPrealta);
                        }else{
                            logGuardado.push("Error al actualizar el historico "+body.historicosPrealta[i].idhistoricosPrealta+"\n");
                        }
                    }catch(error){
                        console.log("Error al actualizar el historico "+obtenerFechaActualMX(),error);
                        logGuardado.push("Error al actualizar el historico "+body.historicosPrealta[i].idhistoricosPrealta+" error:"+error+"\n");
                    }
                }else{
                    logGuardado.push("Error al actualizar el historico "+body.historicosPrealta[i].idhistoricosPrealta+" no existe\n");
                }
            }else{
                let historico = {...body.historicosPrealta[i], prealta_idprealta: idD};
                try{
                    const respuesta = await prealtaHistorico.create(historico);
                    if(respuesta){
                        /**Ah segun no existe idhistoricosPrealta en respuesta*/
                        logGuardado.push("Historico creado con exito " + respuesta.getDataValue('idhistoricosPrealta'));
                        
                    }else{
                        logGuardado.push("Error al crear el historico "+i+"\n");
                    }
                }catch(error){
                    console.log("Error al crear el historico"+obtenerFechaActualMX(),error);
                    logGuardado.push("Error al crear el historico "+i+" error:"+error+"\n");
                }
            }
        }
        for(let i = 0; i < Object.keys(body.actividadPrealta).length; i++){
            if(body.actividadPrealta[i].idactividadesPrealta != null){
                const actividad = await prealtaActividad.findByPk(body.actividadPrealta[i].idactividadesPrealta);
                if(actividad){
                    try{
                        await actividad!.update(body.actividadPrealta[i]);
                        logGuardado.push("Actividad actualizada con exito "+body.actividadPrealta[i].idactividadesPrealta);
                    }catch(error){
                        console.log("Error al actualizar la actividad",error);
                        logGuardado.push("Error al actualizar la actividad "+body.actividadPrealta[i].idactividadesPrealta + " error:"+error+"\n");
                    }
                }else{
                    logGuardado.push("Error al actualizar la actividad "+body.actividadPrealta[i].idactividadesPrealta + " no existe\n");
                }
            }else{
                let actividad = {...body.actividadPrealta[i], prealta_idprealta: idD};
                try{
                    const respuesta = await prealtaActividad.create(actividad);
                    if(respuesta){
                        /**Ah segun no existe idactividadesPrealta en respuesta*/
                        logGuardado.push("Actividad creada con exito " + respuesta.getDataValue('idactividadesPrealta'));
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
        logGuardado.push("No se relizaron cambios en la Prealta\n");
    }
    const docDB = await Prealta.findByPk(idD,{
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
            model: prealtaHistorico,
            as: 'historicosPrealta',
            include:[
                {
                    model:partes,
                    as: 'parte',
                }
            ],
        },
        {
            model: prealtaActividad,
            as: 'actividadesPrealta',
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

export const updatePrealta = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const prealta = await Prealta.findByPk(id);
    if(prealta){
       await prealta.update(body);
       res.json({
            msg:'La prealta se actualizo con exito!',
            response: prealta
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ninguna prealta con id ${id}`
        })
    }
}

export const getResumen = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const prealta_list = await Prealta.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (prealta_list.length > 0) {
      const altas = prealta_list.map((item) => item.getDataValue('probabilidad'));
      resumen[0] = altas.filter((probabilidad) => probabilidad === 0).length;
      resumen[1] = altas.filter((probabilidad) => probabilidad === 1).length;
      resumen[2] = altas.filter((probabilidad) => probabilidad === 2).length;
    } 
    res.json(resumen);
    
  };
  
  
  