import db from '../db/connection';
import { DataTypes } from 'sequelize';

const prealtaAlta = db.define('prealtaAlta', {
    idprealtaAlta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idprealtaAlta'
    },
    alta_idalta:{
        type: DataTypes.INTEGER,
    },
    prealta_idprealta:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'prealtaAlta',
    
});

export default prealtaAlta;