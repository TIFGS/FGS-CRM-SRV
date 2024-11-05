import { DateTime } from 'luxon';
import {Request,Response} from 'express';
import parte from '../models/partes';

export const getAll = async (req:Request, res:Response) => {
    const list = await parte.findAll();
    /*let list = {
        prueba1:"prueba"
    };*/
    res.json(list); 
}

export const getById = async (req:Request,res:Response) => {
    const { id } = req.params;
    const partes = await parte.findByPk(id);
    if(partes){
        res.json(partes);
    }else{
        res.status(404).json({
            msg: `No existe una parte con ese id ${id}`
        });
    }
}

export const deleteparte = async (req:Request,res:Response) => {
    const { id } = req.params;
    const partes = await parte.findByPk(id);
    if(!partes){
        res.status(404).json({
            msg:`No se encontro ninguna parte con id ${id}`
        })
    }else{
        await parte.destroy();
        res.json({
            msg:`la parte fue eliminado con exito!`
        })
    }
}

export const postparte = async (req:Request,res:Response) => {
    const { body } = req;
    try{
        let respuesta = await parte.create(body);
        res.json({
            msg: 'la parte se creo con exito!',
            parte:respuesta
        });
    }catch(error){
        console.error("Fecha Error",obtenerFechaActualMX());
        console.error("Error al guardar el articulo",error,body);
        res.status(404).json({msg:"Error al guardar el articulo",error:error,body:body});
        
    }
}

export const comprobarparte = async (req:Request,res:Response) => {
    const { body } = req;
    const busqueda = await parte.findAll({ where: { nombre: body["nombre"] } });
    //res.json(partes);
    if(busqueda.length > 0){
        res.json(busqueda);
    }else{
        let respuesta = [await parte.create(body)];
        res.json(respuesta);
    }
}

export const updateparte = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const partes = await parte.findByPk(id);
    if(partes){
       await partes.update(body);
       res.json({
            msg:'la parte se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ninguna parte con id ${id}`
        })
    }
}

function obtenerFechaActualMX() {
    const mexicoCity = DateTime.now().setZone('America/Mexico_City');
    return mexicoCity.toFormat('yyyy-LL-dd HH:mm:ss');
}
