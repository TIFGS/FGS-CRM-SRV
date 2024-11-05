import {Request,Response} from 'express';
import prealtaHistorico from '../models/prealtaHistorico';

export const getAll = async (req:Request, res:Response) => {
    const list = await prealtaHistorico.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const prealtaHistoricos = await prealtaHistorico.findByPk(id);
    if(prealtaHistoricos){
        res.json(prealtaHistoricos);
    }else{
        res.status(404).json({
            msg: `No existe un historico con ese id ${id}`
        });
    }
}

export const getByDocumento = async(req:Request, res:Response) =>{
    const { id } = req.params;
    const list = await prealtaHistorico.findAll({where: {prealta_idprealta: id}});
    res.json(list); 
}

export const deleteprealtaHistorico = async (req:Request,res:Response) => {
    const { id } = req.params;
    const prealtaHistoricos = await prealtaHistorico.findByPk(id);
    if(!prealtaHistoricos){
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }else{
        await prealtaHistorico.destroy();
        res.json({
            msg:`El permiso fue eliminado con exito!`
        })
    }
}

export const postprealtaHistorico = async (req:Request,res:Response) => {
    const { body } = req;
    await prealtaHistorico.create(body)
    res.json({
        msg: 'el historico se creo con exito!'
    })
}

export const updateprealtaHistorico = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const prealtaHistoricos = await prealtaHistorico.findByPk(id);
    if(prealtaHistoricos){
       await prealtaHistoricos.update(body);
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
    //const maxVersion = await prealtaHistorico.max('version', { where: { prealta_idprealta: id } });
    const cotHist = await prealtaHistorico.findAll({where: {prealta_idprealta: id, version:1}});
    cotHist.forEach((cot)=>{
      precio +=  Number(cot.getDataValue('precioTotal'));
    });
    res.json(precio);
};  