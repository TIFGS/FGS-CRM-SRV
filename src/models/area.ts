import db from '../db/connection';
import { DataTypes } from 'sequelize';

const area = db.define('area', {
    idarea:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idarea'
    },
    nombre:{
        type: DataTypes.STRING,
    },
    activo:{
        type: DataTypes.BOOLEAN,
    },
    planta_idplanta:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'area',
    
});


export default area;
