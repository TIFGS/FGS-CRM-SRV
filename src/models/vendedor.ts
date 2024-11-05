
import db from '../db/connection';
import { DataTypes } from 'sequelize';

const vendedor = db.define('vendedor', {
    idvendedor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idvendedor'
    },
    nombre:{
        type: DataTypes.STRING,
    },
    apellidos:{
        type: DataTypes.STRING,
    },
    edad:{
        type: DataTypes.INTEGER,
    },
    telefono:{
        type: DataTypes.STRING,
    },
    correo:{
        type: DataTypes.STRING,
    }
},{
    createdAt: false,
    updatedAt: false,
    tableName:'vendedor',
    
});


export default vendedor;
