import {Request,Response} from 'express';
import vendedor from '../models/vendedor';
import clientePlanta from '../models/clientePlanta';
import planta from '../models/planta';
import cliente from '../models/cliente';
import marca from '../models/marca';

export const getAll = async (req:Request, res:Response) => {
    const list = await vendedor.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await vendedor.findByPk(id);
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una vendedor con ese id ${id}`
        });
    }
}

export const getAllDependencias = async (req:Request, res:Response) => {
    const list = await vendedor.findAll({
        include: [
            {
                model: clientePlanta,
                as: 'clientePlanta',
                include:[
                    {
                        model: planta,
                        as: 'planta',
                        include:[
                            {
                                model:marca,
                                as: 'marca',
                            }
                        ],
                    },
                    {
                        model: cliente,
                        as: 'cliente',
                    },
                    {
                        model:vendedor,
                        as: 'vendedor',
                    },
                    {
                        model:vendedor,
                        as:'vendedorRef'
                    }
                ],
            },
        ]
    });
    res.json(list); 
}

export const getByIdDependencias = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await vendedor.findByPk(id,{
        include: [
            {
                model: clientePlanta,
                as: 'clientePlanta',
                include:[
                    {
                        model: planta,
                        as: 'planta',
                        include:[
                            {
                                model:marca,
                                as: 'marca',
                            }
                        ],
                    },
                    {
                        model: cliente,
                        as: 'cliente',
                    },
                    {
                        model:vendedor,
                        as: 'vendedor',
                    },
                    {
                        model:vendedor,
                        as:'vendedorRef'
                    }
                ],
            },
        ]
    });
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una vendedor con ese id ${id}`
        });
    }
}

/*export const getBymarca_idmarca = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await vendedor.findAll({where:{marca_idmarca:id}});
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una vendedor con ese id ${id}`
        });
    }
}*/

export const deletevendedor = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta = await vendedor.findByPk(id);
    if(!respuesta){
        res.status(404).json({
            msg:`No se encontro ningun vendedor con id ${id}`
        })
    }else{
        await vendedor.destroy();
        res.json({
            msg:`El vendedor fue eliminado con exito!`
        })
    }
}

export const postvendedor = async (req:Request,res:Response) => {
    const { body } = req;
    await vendedor.create(body)
    res.json({
        msg: 'El vendedor se agrego con exito!'
    })
}

export const updatevendedor = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const respuesta = await vendedor.findByPk(id);
    if(respuesta){
       await respuesta.update(body);
       res.json({
            msg:'El vendedor se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun vendedor con id ${id}`
        })
    }
}
