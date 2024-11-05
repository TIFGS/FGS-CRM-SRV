import db from '../db/connection';
import { DataTypes } from 'sequelize';
import partes from './partes';
import Factura from './factura';

const facturaHistorico = db.define('historicosFactura', {
    idhistoricosFactura:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idhistoricosFactura'
    },
    parteCliente:{
        type: DataTypes.STRING,
    },
    UMedida:{
        type: DataTypes.STRING,
    },
    cantidad:{
        type: DataTypes.FLOAT,
    },
    precioUni:{
        type: DataTypes.FLOAT,
    },
    precioTotal:{
        type: DataTypes.FLOAT,
    },
    version:{
        type: DataTypes.INTEGER,
    },
    partes_idpartes :{
        type: DataTypes.INTEGER,
    },
    factura_idfactura:{
        type: DataTypes.INTEGER,
    }
},{
    createdAt: false,
    updatedAt: false,
    tableName:'historicosFactura',
});

facturaHistorico.belongsTo(Factura, { foreignKey: 'factura_idfactura',as: 'factura'});
Factura.hasMany(facturaHistorico, { foreignKey: 'factura_idfactura',as: 'historicosFacturas'});
facturaHistorico.belongsTo(partes,{foreignKey:'partes_idpartes',as: 'parte'});
partes.hasOne(facturaHistorico,{foreignKey:'partes_idpartes',as: 'historicosFacturas'});

export default facturaHistorico;