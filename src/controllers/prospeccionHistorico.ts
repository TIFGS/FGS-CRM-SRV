import {Request,Response} from 'express';
import prospeccionHistorico from '../models/prospeccionHistorico';

export const getAll = async (req:Request, res:Response) => {
    const list = await prospeccionHistorico.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const prospeccionHistoricos = await prospeccionHistorico.findByPk(id);
    if(prospeccionHistoricos){
        res.json(prospeccionHistoricos);
    }else{
        res.status(404).json({
            msg: `No existe un historico con ese id ${id}`
        });
    }
}

export const getByDocumento = async(req:Request, res:Response) =>{
    const { id } = req.params;
    const list = await prospeccionHistorico.findAll({where: {prospecciones_idprospecciones: id}});
    res.json(list); 
}

export const deleteprospeccionHistorico = async (req:Request,res:Response) => {
    const { id } = req.params;
    const prospeccionHistoricos = await prospeccionHistorico.findByPk(id);
    if(!prospeccionHistoricos){
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }else{
        await prospeccionHistorico.destroy();
        res.json({
            msg:`El permiso fue eliminado con exito!`
        })
    }
}

export const postprospeccionHistorico = async (req:Request,res:Response) => {
    const { body } = req;
    await prospeccionHistorico.create(body)
    res.json({
        msg: 'el historico se creo con exito!'
    })
}

export const updateprospeccionHistorico = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const prospeccionHistoricos = await prospeccionHistorico.findByPk(id);
    if(prospeccionHistoricos){
       await prospeccionHistoricos.update(body);
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
    const { id } = req.params;
    var precio:number = 0;
    /*const maxVersion = await prospeccionHistorico.max('version', { where: { cotizaciones_idcotizaciones: id } });
    const cotHist = await prospeccionHistorico.findAll({where: {cotizaciones_idcotizaciones: id, version:maxVersion}});
    cotHist.forEach((cot)=>{
      precio +=  Number(cot.getDataValue('precioTotal'));
    });*/
    res.json(precio);
};