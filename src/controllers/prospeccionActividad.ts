import {Request,Response} from 'express';
import prospeccionActividad from '../models/prospeccionActividad';

export const getAll = async (req:Request, res:Response) => {
    const list = await prospeccionActividad.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const resp = await prospeccionActividad.findByPk(id);
    if(resp){
        res.json(resp);
    }else{
        res.status(404).json({
            msg: `No existe un historico con ese id ${id}`
        });
    }
}

export const getByIdDoc = async (req:Request,res:Response) => {
    const { id } = req.params;
    const resp = await prospeccionActividad.findAll({ where: { prospecciones_idprospecciones: id } });
    if(resp){
        res.json(resp);
    }else{
        res.status(404).json({
            msg: `No existe un historico con ese id ${id}`
        });
    }
}

export const del = async (req:Request,res:Response) => {
    const { id } = req.params;
    const resp = await prospeccionActividad.findByPk(id);
    if(!resp){
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }else{
        await prospeccionActividad.destroy();
        res.json({
            msg:`El permiso fue eliminado con exito!`
        })
    }
}

export const post = async (req:Request,res:Response) => {
    const { body } = req;
    await prospeccionActividad.create(body)
    res.json({
        msg: 'el historico se creo con exito!'
    })
}

export const update = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const resp = await prospeccionActividad.findByPk(id);
    if(resp){
       await resp.update(body);
       res.json({
            msg:'el historico se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun historico con id ${id}`
        })
    }
}