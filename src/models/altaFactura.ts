import db from '../db/connection';
import { DataTypes } from 'sequelize';

const altaFactura = db.define('altaFactura', {
    idaltaFactura:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idaltaFactura'
    },
    alta_idalta:{
        type: DataTypes.INTEGER,
    },
    factura_idfactura:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'altaFactura',
    
});

export default altaFactura;