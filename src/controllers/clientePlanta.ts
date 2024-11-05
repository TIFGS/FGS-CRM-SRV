import {Request,Response} from 'express';
import clientePlanta from '../models/clientePlanta';
import planta from '../models/planta';
import cliente from '../models/cliente';
import vendedor from '../models/vendedor';
import marca from '../models/marca';

export const getAll = async (req:Request, res:Response) => {
    const list = await clientePlanta.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await clientePlanta.findByPk(id);
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una clientePlanta con ese id ${id}`
        });
    }
}

export const getAllDependecias = async (req:Request, res:Response) => {
    const list = await clientePlanta.findAll({
        order: [['idclientePlanta', 'DESC']],
        include: [{
            model: planta,
            as: 'planta',
            include: [{
                model: marca
            }]
        },
        {
            model: cliente,
            as:'cliente'
        },
        {
            model: vendedor,
            as:'vendedor'
        }],
    });
    res.json(list); 
}

export const getByplanta_idplanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await clientePlanta.findAll({
        order: [['idclientePlanta', 'DESC']],
        include: [{
            model: planta,
            as: 'planta',
            include: [{
                model: marca
            }]
        },
        {
            model: cliente,
            as:'cliente'
        },
        {
            model: vendedor,
            as:'vendedor'
        }],
    });
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una clientePlanta con ese id ${id}`
        });
    }
}

export const getBycliente_idcliente = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await clientePlanta.findAll({
        order: [['idclientePlanta', 'DESC']],
        include: [{
            model: planta,
            as: 'planta',
            include: [{
                model: marca
            }]
        },
        {
            model: cliente,
            as:'cliente'
        },
        {
            model: vendedor,
            as:'vendedor'
        }],
    });
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una clientePlanta con ese id ${id}`
        });
    }
}

export const getByvendedor_idvendedor = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await clientePlanta.findAll({
        order: [['idclientePlanta', 'DESC']],
        include: [{
            model: planta,
            as: 'planta',
            include: [{
                model: marca
            }]
        },
        {
            model: cliente,
            as:'cliente'
        },
        {
            model: vendedor,
            as:'vendedor'
        }],
    });
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una clientePlanta con ese id ${id}`
        });
    }
}

export const deleteclientePlanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta = await clientePlanta.findByPk(id);
    if(!respuesta){
        res.status(404).json({
            msg:`No se encontro ningun clientePlanta con id ${id}`
        })
    }else{
        await clientePlanta.destroy();
        res.json({
            msg:`El clientePlanta fue eliminado con exito!`
        })
    }
}

export const postclientePlanta = async (req:Request,res:Response) => {
    const { body } = req;
    const buscado = await clientePlanta.findAll({where:[{planta_idplanta:body.planta_idplanta},{cliente_idcliente:body.cliente_idcliente},{vendedor_idvendedor:body.vendedor_idvendedor}]});    
    if(Object.keys(buscado).length==0){
        const respuesta = await clientePlanta.create(body);
        if(respuesta){
            res.json({
                msg:'El clientePlanta se creo con exito!',
                obj:respuesta,
            })
        }else{
            res.status(404).json({
                msg:`Error al crear clientePlanta con ${body}`,
                obj:respuesta,
            })
        }
    }else{
        res.status(200).json({
            msg: `Ya existe una relacion con esos parametros ${body}`,
            obj: buscado,
        });
    }
}

export const updateclientePlanta = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const respuesta = await clientePlanta.findByPk(id);

    if(respuesta && JSON.stringify(respuesta) !== "[]"){
       await respuesta.update(body);
       res.json({
            msg:'El clientePlanta se actualizo con exito!',
            obj:respuesta,
       })
    }else{
        if(!respuesta){
            res.status(404).json({
                msg: `No existe una relacion con esos parametros ${body}`,
                obj:[],
            });
        }else{
            res.status(200).json({
                msg: `No existe una relacion con esos parametros ${body}`,
                obj: respuesta,
            });
        }
    }
}