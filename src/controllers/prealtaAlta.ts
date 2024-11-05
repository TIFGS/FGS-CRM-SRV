import {Request,Response} from 'express';
import prealtaAlta from '../models/prealtaAlta';

export const getAll = async (req:Request, res:Response) => {
    const list = await prealtaAlta.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await prealtaAlta.findByPk(id);
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una prealtaAlta con ese id ${id}`
        });
    }
}

export const getByalta_idalta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await prealtaAlta.findAll({where:{alta_idalta:id}});
    if(respuesta){
        res.json({
            msg:"Relaciones encontradas",
            response:respuesta
        });
    }else{
        res.status(404).json({
            msg: `No existe una prealtaAlta con ese id ${id}`
        });
    }
}

export const getByprealta_idprealta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await prealtaAlta.findAll({where:{prealta_idprealta:id}});
    if(respuesta){
        res.json({
            msg:"Relaciones encontradas",
            response:respuesta
        });
    }else{
        res.status(404).json({
            msg: `No existe una prealtaAlta con ese id ${id}`
        });
    }
}

export const deleteprealtaAlta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta = await prealtaAlta.findByPk(id);
    if(!respuesta){
        res.status(404).json({
            msg:`No se encontro ningun prealtaAlta con id ${id}`
        })
    }else{
        await prealtaAlta.destroy();
        res.json({
            msg:`El prealtaAlta fue eliminado con exito!`
        })
    }
}

export const postprealtaAlta = async (req:Request,res:Response) => {
    const { body } = req;
    await prealtaAlta.create(body)
    res.json({
        msg: 'El prealtaAlta se agrego con exito!'
    })
}

export const updateprealtaAlta = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const respuesta = await prealtaAlta.findByPk(id);
    if(respuesta){
       await respuesta.update(body);
       res.json({
            msg:'El prealtaAlta se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun prealtaAlta con id ${id}`
        })
    }
}
