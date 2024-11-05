import {Request,Response} from 'express';
import altaHistorico from '../models/altaHistorico';

export const getAll = async (req:Request, res:Response) => {
    const list = await altaHistorico.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const altaHistoricos = await altaHistorico.findByPk(id);
    if(altaHistoricos){
        res.json(altaHistoricos);
    }else{
        res.status(404).json({
            msg: `No existe un historico con ese id ${id}`
        });
    }
}
export const getByDocumento = async(req:Request, res:Response) =>{
    const { id } = req.params;
    const list = await altaHistorico.findAll({where: {alta_idAlta: id}});
    res.json(list); 
}

export const deletealtaHistorico = async (req:Request,res:Response) => {
    const { id } = req.params;
    const altaHistoricos = await altaHistorico.findByPk(id);
    if(!altaHistoricos){
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }else{
        await altaHistorico.destroy();
        res.json({
            msg:`El permiso fue eliminado con exito!`
        })
    }
}

export const postaltaHistorico = async (req:Request,res:Response) => {
    const { body } = req;
    let altahistorico =  await altaHistorico.create(body)
    //let altahistorico = JSON.stringify(body);
    res.json({
        response:altahistorico,
        msg: 'el historico se creo con exito!'
    })
}

export const updatealtaHistorico = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const altaHistoricos = await altaHistorico.findByPk(id);
    if(altaHistoricos){
       await altaHistoricos.update(body);
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
    //const maxVersion = await altaHistorico.max('version', { where: { alta_idAlta: id } });
    const cotHist = await altaHistorico.findAll({where: {alta_idAlta: id, version:1}});
    cotHist.forEach((cot)=>{
      precio +=  Number(cot.getDataValue('precioTotal'));
    });
    res.json(precio);
};  