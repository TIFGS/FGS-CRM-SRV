import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Permusuario = db.define('permusuario', {
    id_usuario:{
        type: DataTypes.INTEGER,
    },
    id_permiso:{
        type: DataTypes.INTEGER,
    }
},{
    createdAt: false,
    updatedAt: false,
    
});

export default Permusuario;