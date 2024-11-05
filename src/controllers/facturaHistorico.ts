
import {Request,Response} from 'express';
import facturaHistorico from '../models/facturaHistorico';

export const getAll = async (req:Request, res:Response) => {
    const list = await facturaHistorico.findAll();
    /*let list = {
        prueba1:"prueba"
    };*/
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const facturaHistoricos = await facturaHistorico.findByPk(id);
    if(facturaHistoricos){
        res.json(facturaHistoricos);
    }else{
        res.status(404).json({
            msg: `No existe un historico con ese id ${id}`
        });
    }
}

export const getByDocumento = async(req:Request, res:Response) =>{
    const { id } = req.params;
    const list = await facturaHistorico.findAll({where: {factura_idfactura: id}});
    res.json(list); 
}

export const deletefacturaHistorico = async (req:Request,res:Response) => {
    const { id } = req.params;
    const facturaHistoricos = await facturaHistorico.findByPk(id);
    if(!facturaHistoricos){
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }else{
        await facturaHistorico.destroy();
        res.json({
            msg:`El permiso fue eliminado con exito!`
        })
    }
}

export const postfacturaHistorico = async (req:Request,res:Response) => {
    const { body } = req;
    await facturaHistorico.create(body)
    res.json({
        msg: 'el historico se creo con exito!'
    })
}

export const updatefacturaHistorico = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const facturaHistoricos = await facturaHistorico.findByPk(id);
    if(facturaHistoricos){
       await facturaHistoricos.update(body);
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
    const maxVersion = await facturaHistorico.max('version', { where: { factura_idfactura: id } });
    const cotHist = await facturaHistorico.findAll({where: {factura_idfactura: id, version:maxVersion}});
    cotHist.forEach((cot)=>{
      precio +=  Number(cot.getDataValue('precioTotal'));
    });
    res.json(precio);
}