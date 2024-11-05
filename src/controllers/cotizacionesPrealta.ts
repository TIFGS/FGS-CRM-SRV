import {Request,Response} from 'express';
import cotizacionesPrealta from '../models/cotizacionesPrealta';

export const getAll = async (req:Request, res:Response) => {
    const list = await cotizacionesPrealta.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await cotizacionesPrealta.findByPk(id);
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una cotizacionesPrealta con ese id ${id}`
        });
    }
}

export const getByprealta_idPreAlta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await cotizacionesPrealta.findAll({where:{prealta_idPreAlta:id}});
    if(respuesta){
        res.json({
            msg:"Relaciones encontradas",
            response:respuesta
        });
    }else{
        res.status(404).json({
            msg: `No existe una cotizacionesPrealta con ese id ${id}`
        });
    }
}

export const getBycotizaciones_idcotizaciones = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await cotizacionesPrealta.findAll({where:{cotizaciones_idcotizaciones:id}});
    if(respuesta){
        res.json({
            msg:"Relaciones encontradas",
            response:respuesta
        });
    }else{
        res.status(404).json({
            msg: `No existe una cotizacionesPrealta con ese id ${id}`
        });
    }
}

export const deletecotizacionesPrealta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta = await cotizacionesPrealta.findByPk(id);
    if(!respuesta){
        res.status(404).json({
            msg:`No se encontro ningun cotizacionesPrealta con id ${id}`
        })
    }else{
        await cotizacionesPrealta.destroy();
        res.json({
            msg:`El cotizacionesPrealta fue eliminado con exito!`
        })
    }
}

export const postcotizacionesPrealta = async (req:Request,res:Response) => {
    const { body } = req;
    await cotizacionesPrealta.create(body)
    res.json({
        msg: 'El cotizacionesPrealta se agrego con exito!'
    })
}

export const updatecotizacionesPrealta = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const respuesta = await cotizacionesPrealta.findByPk(id);
    if(respuesta){
       await respuesta.update(body);
       res.json({
            msg:'El cotizacionesPrealta se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun cotizacionesPrealta con id ${id}`
        })
    }
}
