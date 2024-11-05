
import {Request,Response} from 'express';
import Permiso from '../models/permiso';

export const getAllPermisos = async (req:Request, res:Response) => {
    const listPermisos = await Permiso.findAll();
    res.json(listPermisos); 
}

export const getPermiso = async (req:Request,res:Response) => {
    const { id } = req.params;
    const permiso =await Permiso.findByPk(id);
    if(permiso){
        res.json(permiso);
    }else{
        res.status(404).json({
            msg: `No existe un permiso con ese id ${id}`
        });
    }
}

export const deletePermiso = async (req:Request,res:Response) => {
    const { id } = req.params;
    const permiso = await Permiso.findByPk(id);
    if(!permiso){
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }else{
        await permiso.destroy();
        res.json({
            msg:`El permiso fue eliminado con exito!`
        })
    }
}

export const postPermiso = async (req:Request,res:Response) => {
    const { body } = req;
    await Permiso.create(body )
    res.json({
        msg: 'El permiso se agrego con exito!'
    })
}

export const updatePermiso = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const permiso = await Permiso.findByPk(id);
    if(permiso){
       await permiso.update(body);
       res.json({
        msg:'El permiso se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }
}


  