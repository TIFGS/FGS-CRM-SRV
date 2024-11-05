import db from '../db/connection';
import { DataTypes } from 'sequelize';

const marca = db.define('marca', {
    idmarca: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idmarca'
    },
    nombre:{
        type: DataTypes.STRING,
    },
    tipoIndustria:{
        type: DataTypes.STRING,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'marca',
    
});

export default marca;
