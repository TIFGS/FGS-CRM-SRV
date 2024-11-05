import {Request,Response} from 'express';
import Area from '../models/area';

export const getAll = async (req:Request, res:Response) => {
    const list = await Area.findAll();
    res.json(list); 
}

export const getGroupByNombre = async (req:Request, res:Response) => {
    
    const list = await Area.findAll({ group: 'nombre' });
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const area =await Area.findByPk(id);
    if(area){
        res.json(area);
    }else{
        res.status(404).json({
            msg: `No existe una area con ese id ${id}`
        });
    }
}

export const getByplanta_idplanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const area = await Area.findAll({where:{planta_idplanta:id}});    
    if(area && JSON.stringify(area) !== "[]"){
        res.json(area);
    }else{
        if(!area){
            res.status(404).json({
                msg: `No existe una area con ese id ${id}`
            });
        }else{
            res.status(200).json({
                msg: `No existe una area con ese id ${id}`
            });
        }
    }
}

export const deleteArea = async (req:Request,res:Response) => {
    const { id } = req.params;
    const area = await Area.findByPk(id);
    if(!area){
        res.status(404).json({
            msg:`No se encontro ningun area con id ${id}`
        })
    }else{
        await area.destroy();
        res.json({
            msg:`El area fue eliminado con exito!`
        })
    }
}

export const postArea = async (req:Request,res:Response) => {
    const { body } = req;
    const guardado = await Area.create(body)
    res.json({
        msg: 'El area se agrego con exito!',
        obj: JSON.stringify(guardado),
    })
}



export const updateArea = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const area = await Area.findByPk(id);
    if(area){
       const resultado = await area.update(body);
       res.json({
            msg:'El area se actualizo con exito!',
            obj:resultado,
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun area con id ${id}`
        })
    }
}