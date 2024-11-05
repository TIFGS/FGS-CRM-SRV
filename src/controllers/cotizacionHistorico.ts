import {Request,Response} from 'express';
import cotizacionHistorico from '../models/cotizacionHistorico';

export const getAll = async (req:Request, res:Response) => {
    const list = await cotizacionHistorico.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const cotizacionHistoricos = await cotizacionHistorico.findByPk(id);
    if(cotizacionHistoricos){
        res.json(cotizacionHistoricos);
    }else{
        res.status(404).json({
            msg: `No existe un historico con ese id ${id}`
        });
    }
}

export const getByDocumento = async(req:Request, res:Response) =>{
    const { id } = req.params;
    const list = await cotizacionHistorico.findAll({where: {cotizaciones_idcotizaciones: id}});
    res.json(list); 
}

export const deletecotizacionHistorico = async (req:Request,res:Response) => {
    const { id } = req.params;
    const cotizacionHistoricos = await cotizacionHistorico.findByPk(id);
    if(!cotizacionHistoricos){
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }else{
        console.log(cotizacionHistoricos);
        await cotizacionHistorico.destroy({ where: { idhistoricosCotizaciones:id } });
        res.json({
            msg:`El permiso fue eliminado con exito!`,
        })
    }
}

export const postcotizacionHistorico = async (req:Request,res:Response) => {
    const { body } = req;
    await cotizacionHistorico.create(body)
    res.json({
        msg: 'el historico se creo con exito!'
    })
}

export const updatecotizacionHistorico = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const cotizacionHistoricos = await cotizacionHistorico.findByPk(id);
    if(cotizacionHistoricos){
       await cotizacionHistoricos.update(body);
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
    const maxVersion = await cotizacionHistorico.max('version', { where: { cotizaciones_idcotizaciones: id } });
    const cotHist = await cotizacionHistorico.findAll({where: {cotizaciones_idcotizaciones: id, version:maxVersion}});
    cotHist.forEach((cot)=>{
      precio +=  Number(cot.getDataValue('precioTotal'));
    });
    res.json(precio);
}  