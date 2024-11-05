import {Request,Response} from 'express';
import cotizacionesAlta from '../models/cotizacionesAlta';

export const getAll = async (req:Request, res:Response) => {
    const list = await cotizacionesAlta.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await cotizacionesAlta.findByPk(id);
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una cotizacionesAlta con ese id ${id}`
        });
    }
}

export const getByalta_idalta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await cotizacionesAlta.findAll({where:{alta_idalta:id}});
    if(respuesta){
        res.json({
            msg:"Relaciones encontradas",
            response:respuesta
        });
    }else{
        res.status(404).json({
            msg: `No existe una cotizacionesAlta con ese id ${id}`
        });
    }
}

export const getBycotizaciones_idcotizaciones = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await cotizacionesAlta.findAll({where:{cotizaciones_idcotizaciones:id}});
    if(respuesta){
        res.json({
            msg:"Relaciones encontradas",
            response:respuesta
        });
    }else{
        res.status(404).json({
            msg: `No existe una cotizacionesAlta con ese id ${id}`
        });
    }
}

export const deletecotizacionesAlta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta = await cotizacionesAlta.findByPk(id);
    if(!respuesta){
        res.status(404).json({
            msg:`No se encontro ningun cotizacionesAlta con id ${id}`
        })
    }else{
        await cotizacionesAlta.destroy();
        res.json({
            msg:`El cotizacionesAlta fue eliminado con exito!`
        })
    }
}

export const postcotizacionesAlta = async (req:Request,res:Response) => {
    const { body } = req;
    await cotizacionesAlta.create(body)
    res.json({
        msg: 'El cotizacionesAlta se agrego con exito!'
    })
}

export const updatecotizacionesAlta = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const respuesta = await cotizacionesAlta.findByPk(id);
    if(respuesta){
       await respuesta.update(body);
       res.json({
            msg:'El cotizacionesAlta se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun cotizacionesAlta con id ${id}`
        })
    }
}
