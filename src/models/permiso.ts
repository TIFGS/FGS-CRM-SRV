import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Permiso = db.define('permiso', {
    url:{
        type: DataTypes.STRING,
    },
    descripcion:{
        type: DataTypes.INTEGER,
    }
},{
    createdAt: false,
    updatedAt: false,
    
});

export default Permiso;