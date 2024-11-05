import {Request,Response} from 'express';
import oportunidadesProspecciones from '../models/oportunidadesProspecciones';

export const getAll = async (req:Request, res:Response) => {
    const list = await oportunidadesProspecciones.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await oportunidadesProspecciones.findByPk(id);
    if(respuesta){
        res.json(respuesta);
    }else{
        res.status(404).json({
            msg: `No existe una oportunidadesProspecciones con ese id ${id}`
        });
    }
}

export const getByprospecciones_idprospecciones = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await oportunidadesProspecciones.findAll({where:{prospecciones_idprospecciones:id}});
    if(respuesta){
        res.json({
            msg:"Relaciones encontradas",
            response:respuesta
        });
    }else{
        res.status(404).json({
            msg: `No existe una oportunidadesProspecciones con ese id ${id}`
        });
    }
}

export const getByoportunidades_idoportunidades = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta =await oportunidadesProspecciones.findAll({where:{oportunidades_idoportunidades:id}});
    if(respuesta){
        res.json({
            msg:"Relaciones encontradas",
            response:respuesta
        });
    }else{
        res.status(404).json({
            msg: `No existe una oportunidadesProspecciones con ese id ${id}`
        });
    }
}

export const deleteoportunidadesProspecciones = async (req:Request,res:Response) => {
    const { id } = req.params;
    const respuesta = await oportunidadesProspecciones.findByPk(id);
    if(!respuesta){
        res.status(404).json({
            msg:`No se encontro ningun oportunidadesProspecciones con id ${id}`
        })
    }else{
        await oportunidadesProspecciones.destroy();
        res.json({
            msg:`El oportunidadesProspecciones fue eliminado con exito!`
        })
    }
}

export const postoportunidadesProspecciones = async (req:Request,res:Response) => {
    const { body } = req;
    await oportunidadesProspecciones.create(body)
    res.json({
        msg: 'El oportunidadesProspecciones se agrego con exito!'
    })
}

export const updateoportunidadesProspecciones = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const respuesta = await oportunidadesProspecciones.findByPk(id);
    if(respuesta){
       await respuesta.update(body);
       res.json({
            msg:'El oportunidadesProspecciones se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun oportunidadesProspecciones con id ${id}`
        })
    }
}
