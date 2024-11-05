
import {Request,Response} from 'express';
import Permusuario from '../models/permusuario';
import Permiso from '../models/permiso';
import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';

export const getAllPermuser = async (req: Request, res: Response) => {
  const { id_usuario } = req.params;
  try {
    const permisos_user = await Permusuario.findAll({ where: { id_usuario: id_usuario } });
    let permisos: Array<any>; // Declara la variable permisos aquí

    if (permisos_user.length > 0) {
      permisos = await Permiso.findAll({
        where: {
          id: {
            [Op.notIn]: permisos_user.map((permiso) => permiso.get('id_permiso'))
          }
        }
      });
    } else {
      permisos = await Permiso.findAll();
    }

    res.json(permisos);
  } catch (error) {
    res.status(500).json({
      msg: 'Ocurrió un error al obtener los permisos',
    });
  }
};


export const getPermuser = async (req:Request,res:Response) => {
    const { id_usuario } = req.params;
    const permiso =await Permusuario.findAll({ where: { id_usuario: id_usuario } });
    if(permiso){
        res.json(permiso);
    }else{
        res.status(404).json({
            msg: `No existe un permiso con ese id ${id_usuario}`
        });
    }
}

export const getPermuserIds = async (req: Request, res: Response) => {
    const { id_usuario } = req.params;
    const permisos = await Permusuario.findAll({ where: { id_usuario: id_usuario } });
    if (permisos.length > 0) {
      const permisosIds = permisos.map((permiso) => permiso.getDataValue('id_permiso'));
      res.json(permisosIds);
    } else {
      res.status(404).json({
        msg: `No existe un permiso con ese id ${id_usuario}`
      });
    }
  }

export const deletePermuser = async (req:Request,res:Response) => {
    const { id } = req.params;
    const permiso = await Permusuario.findByPk(id);
    if(!permiso){
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }else{
        await permiso.destroy();
        res.json({
            msg:`El permiso fue eliminado con exito!`
        })
    }
}

export const postPermuser = async (req:Request,res:Response) => {
    const { body } = req;
    await Permusuario.create(body )
    res.json({
        msg: 'El permiso se agrego con exito!'
    })
}

export const updatePermuser = async (req:Request,res:Response) => {
    const { body } = req;
    const {id} = req.params;
    const permiso = await Permusuario.findByPk(id);
    if(permiso){
       await permiso.update(body);
       res.json({
        msg:'El permiso se actualizo con exito!'
       })
    }else{
        res.status(404).json({
            msg:`No se encontro ningun permiso con id ${id}`
        })
    }
}


  