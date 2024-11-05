
import db from '../db/connection';
import { DataTypes } from 'sequelize';
import marca from './marca';


const planta = db.define('planta', {
    idplanta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idplanta'
    },
    nombrepl:{
        type: DataTypes.STRING,
    },
    direccion:{
        type: DataTypes.STRING,
    },
    cp:{
        type: DataTypes.STRING,
    },
    estado:{
        type: DataTypes.STRING,
    },
    pais:{
        type: DataTypes.STRING,
    },
    estatus:{
        type: DataTypes.STRING,
    },
    marca_idmarca :{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'planta',
    
});

planta.belongsTo(marca, {foreignKey: 'marca_idmarca'});
marca.hasMany(planta,{foreignKey: 'marca_idmarca'});

export default planta;
