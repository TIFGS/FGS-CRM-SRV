import {Request,Response} from 'express';
import oportunidadHistorico from '../models/oportunidadHistorico';

export const getAll = async (req:Request, res:Response) => {
    const list = await oportunidadHistorico.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const oportunidadHistoricos = await oportunidadHistorico.findByPk(id);
    if(oportunidadHistoricos){
        res.json(oportunidadHistoricos);
    }else{
        res.status(404).json({
            msg: `No existe un historico con ese id ${id}`
        });
    }
}

export const getByDocumento = async(req:Request, res:Response) =>{
    const { id } = req.params;
    const list = await oportunidadHistorico.findAll({where: {oportunidades_idoportunidades: id}});
    res.json(list); 
}

export const deleteoportunidadHistorico = async (req:Request,res:Response) => {
    const { id } = req.params;
    const oportunidadHistoricos = await oportunidadHistorico.findByPk(id);
    if(!oportunidadHistoricos){
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }else{
        await oportunidadHistorico.destroy();
        res.json({
            msg:`El permiso fue eliminado con exito!`
        })
    }
}

export const postoportunidadHistorico = async (req:Request,res:Response) => {
    const { body } = req;
    await oportunidadHistorico.create(body)
    res.json({
        msg: 'el historico se creo con exito!'
    })
}

export const updateoportunidadHistorico = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const oportunidadHistoricos = await oportunidadHistorico.findByPk(id);
    if(oportunidadHistoricos){
       await oportunidadHistoricos.update(body);
       res.json({
            msg:'el historico se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun historico con id ${id}`
        })
    }
}

export const getPrecio = async (req: Request, res: Response) => {
    /*const { id } = req.params;
    var precio:number = 0;
    const maxVersion = await oportunidadHistorico.max('version', { where: { oportunidades_idoportunidades: id } });
    const cotHist = await oportunidadHistorico.findAll({where: {oportunidades_idoportunidades: id, version:maxVersion}});
    cotHist.forEach((cot)=>{
      precio +=  Number(cot.getDataValue('precioTotal'));
    });
    res.json(precio);*/
};  