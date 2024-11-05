import {Request,Response} from 'express';
import Cliente from '../models/cliente';

export const getAll = async (req:Request, res:Response) => {
    const list = await Cliente.findAll();
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const cliente =await Cliente.findByPk(id);
    if(cliente){
        res.json(cliente);
    }else{
        res.status(404).json({
            msg: `No existe una cliente con ese id ${id}`
        });
    }
}

/*export const getByclientePlanta_idclientePlanta = async (req:Request,res:Response) => {
    const { id } = req.params;
    const cliente =await Cliente.findAll({where:{clientePlanta_idclientePlanta:id}});
    if(cliente){
        res.json(cliente);
    }else{
        res.status(404).json({
            msg: `No existe una cliente con ese id ${id}`
        });
    }
}*/

export const deleteCliente = async (req:Request,res:Response) => {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);
    if(!cliente){
        res.status(404).json({
            msg:`No se encontro ningun cliente con id ${id}`
        })
    }else{
        await cliente.destroy();
        res.json({
            msg:`El cliente fue eliminado con exito!`
        })
    }
}

export const postCliente = async (req:Request,res:Response) => {
    const { body } = req;
    const guardado = await Cliente.create(body)
    res.json({
        msg: 'El cliente se agrego con exito!',
        obj: JSON.stringify(guardado),
    })
}

export const updateCliente = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const cliente = await Cliente.findByPk(id);
    if(cliente){
       await cliente.update(body);
       res.json({
            msg:'El cliente se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun cliente con id ${id}`
        })
    }
}

/*export const getResumen = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resumen = [0, 0, 0];
    const alta_list = await Alta.findAll({ where: { clientePlanta_idclientePlanta: id } });
    if (alta_list.length > 0) {
      const altas = alta_list.map((alta) => alta.getDataValue('probabilidad'));
      resumen[0] = altas.filter((probabilidad) => probabilidad === 0).length;
      resumen[1] = altas.filter((probabilidad) => probabilidad === 1).length;
      resumen[2] = altas.filter((probabilidad) => probabilidad === 2).length;
    } 
    res.json(resumen);
    
};*/