import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Usuario = db.define('usuario', {
    username:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    }
},{
    createdAt: false,
    updatedAt: false,
    
});

export default Usuario;