import {Request,Response} from 'express';
import altaFactura from '../models/altaFactura';

export const getAll = async (req:Request, res:Response) => {
    const list = await altaFactura.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await altaFactura.findByPk(id);
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una altaFactura con ese id ${id}`
        });
    }
}

export const getByalta_idalta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await altaFactura.findAll({where:{alta_idalta:id}});
    if(respuesta){
        res.json({
            msg:"Relaciones encontradas",
            response:respuesta
        });
    }else{
        res.status(404).json({
            msg: `No existe una altaFactura con ese id ${id}`
        });
    }
}

export const getByfactura_idfactura = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await altaFactura.findAll({where:{factura_idfactura:id}});
    if(respuesta){
        res.json({
            msg:"Relaciones encontradas",
            response:respuesta
        });
    }else{
        res.status(404).json({
            msg: `No existe una altaFactura con ese id ${id}`
        });
    }
}

export const deletealtaFactura = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta = await altaFactura.findByPk(id);
    if(!respuesta){
        res.status(404).json({
            msg:`No se encontro ningun altaFactura con id ${id}`
        })
    }else{
        await altaFactura.destroy();
        res.json({
            msg:`El altaFactura fue eliminado con exito!`
        })
    }
}

export const postaltaFactura = async (req:Request,res:Response) => {
    const { body } = req;
    await altaFactura.create(body)
    res.json({
        msg: 'El altaFactura se agrego con exito!'
    })
}

export const updatealtaFactura = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const respuesta = await altaFactura.findByPk(id);
    if(respuesta){
       await respuesta.update(body);
       res.json({
            msg:'El altaFactura se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun altaFactura con id ${id}`
        })
    }
}
