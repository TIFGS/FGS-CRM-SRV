import db from '../db/connection';
import { DataTypes } from 'sequelize';

const partes = db.define('partes', {
    idpartes:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idpartes'
    },
    nombre:{
        type: DataTypes.STRING,
    },
    medidas:{
        type: DataTypes.STRING,
    },
    tipomaterial:{
        type: DataTypes.STRING,
    },
    proyecto_idproyecto :{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'partes',
});

export default partes;