import {Request,Response} from 'express';
import planta from '../models/planta';

export const getAll = async (req:Request, res:Response) => {
    const list = await planta.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await planta.findByPk(id);
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una planta con ese id ${id}`
        });
    }
}

export const getBymarca_idmarca = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await planta.findAll({where:{marca_idmarca:id}});
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una planta con ese id ${id}`
        });
    }
}

export const deleteplanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta = await planta.findByPk(id);
    if(!respuesta){
        res.status(404).json({
            msg:`No se encontro ningun planta con id ${id}`
        })
    }else{
        await planta.destroy();
        res.json({
            msg:`El planta fue eliminado con exito!`
        })
    }
}

export const postplanta = async (req:Request,res:Response) => {
    const { body } = req;
    let resultado = await planta.create(body)
    res.json({
        msg: 'El planta se agrego con exito!',
        obj: resultado,
    })
}

export const updateplanta = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const respuesta = await planta.findByPk(id);
    if(respuesta){
       let resultado = await respuesta.update(body);
       res.json({
            msg:'El planta se actualizo con exito!',
            obj:resultado,
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun planta con id ${id}`
        })
    }
}
