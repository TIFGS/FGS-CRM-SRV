import {Request,Response} from 'express';
import prospeccionesCotizaciones from '../models/prospeccionesCotizaciones';

export const getAll = async (req:Request, res:Response) => {
    const list = await prospeccionesCotizaciones.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await prospeccionesCotizaciones.findByPk(id);
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una prospeccionesCotizaciones con ese id ${id}`
        });
    }
}

export const getBycotizaciones_idcotizaciones = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await prospeccionesCotizaciones.findAll({where:{cotizaciones_idcotizaciones:id}});
    if(respuesta){
        res.json({
            msg:"Relaciones encontradas",
            response:respuesta
        });
    }else{
        res.status(404).json({
            msg: `No existe una prospeccionesCotizaciones con ese id ${id}`
        });
    }
}

export const getByprospecciones_idprospecciones = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await prospeccionesCotizaciones.findAll({where:{prospecciones_idprospecciones:id}});
    if(respuesta){
        res.json({
            msg:"Relaciones encontradas",
            response:respuesta
        });
    }else{
        res.status(404).json({
            msg: `No existe una prospeccionesCotizaciones con ese id ${id}`
        });
    }
}

export const deleteprospeccionesCotizaciones = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta = await prospeccionesCotizaciones.findByPk(id);
    if(!respuesta){
        res.status(404).json({
            msg:`No se encontro ningun prospeccionesCotizaciones con id ${id}`
        })
    }else{
        await prospeccionesCotizaciones.destroy();
        res.json({
            msg:`El prospeccionesCotizaciones fue eliminado con exito!`
        })
    }
}

export const postprospeccionesCotizaciones = async (req:Request,res:Response) => {
    const { body } = req;
    await prospeccionesCotizaciones.create(body)
    res.json({
        msg: 'El prospeccionesCotizaciones se agrego con exito!'
    })
}

export const updateprospeccionesCotizaciones = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const respuesta = await prospeccionesCotizaciones.findByPk(id);
    if(respuesta){
       await respuesta.update(body);
       res.json({
            msg:'El prospeccionesCotizaciones se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun prospeccionesCotizaciones con id ${id}`
        })
    }
}
