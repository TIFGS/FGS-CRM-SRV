
import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Cliente = db.define('cliente', {
    idcliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcliente'
    },
    nombre:{
        type: DataTypes.STRING,
    },
    telefono:{
        type: DataTypes.STRING,
    },
    extension:{
        type: DataTypes.STRING,
    },
    celular:{
        type: DataTypes.STRING,
    },
    correo:{
        type: DataTypes.STRING,
    },
    estado:{
        type: DataTypes.STRING,
    },
    puesto:{
        type: DataTypes.STRING,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'cliente',
    
});

export default Cliente;