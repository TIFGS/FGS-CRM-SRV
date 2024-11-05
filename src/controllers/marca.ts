import {Request,Response} from 'express';
import Marca from '../models/marca';

export const getAll = async (req:Request, res:Response) => {
    const list = await Marca.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const marca =await Marca.findByPk(id);
    if(marca){
        res.json(marca);
    }else{
        res.status(404).json({
            msg: `No existe una Marca con ese id ${id}`
        });
    }
}

/*export const getByMarcaPlanta_idMarcaPlanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const Marca =await Marca.findAll({where:{MarcaPlanta_idMarcaPlanta:id}});
    if(Marca){
        res.json(Marca);
    }else{
        res.status(404).json({
            msg: `No existe una Marca con ese id ${id}`
        });
    }
}*/

export const deleteMarca = async (req:Request,res:Response) => {
    const { id } = req.params;
    const marca = await Marca.findByPk(id);
    if(!marca){
        res.status(404).json({
            msg:`No se encontro ningun Marca con id ${id}`
        })
    }else{
        await marca.destroy();
        res.json({
            msg:`El Marca fue eliminado con exito!`
        })
    }
}

export const postMarca = async (req:Request,res:Response) => {
    const { body } = req;
    const guardado = await Marca.create(body)
    res.json({
        msg: 'El Marca se agrego con exito!',
        obj: guardado,
    })
}



export const updateMarca = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const marca = await Marca.findByPk(id);
    if(marca){
       await marca.update(body);
       res.json({
            msg:'El Marca se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun Marca con id ${id}`
        })
    }
}
