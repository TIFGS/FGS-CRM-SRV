import db from '../db/connection';
import { DataTypes } from 'sequelize';
import Factura from './factura';

const facturaActividad = db.define('actividadesFactura', {
    idactividadesFactura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idactividadesFactura'
    },
    titulo:{
        type: DataTypes.STRING,
    },
    descripcion:{
        type: DataTypes.STRING,
    },
    fechacrea:{
        type: DataTypes.DATE,
    },
    fecharecord:{
        type: DataTypes.DATE,
    },
    factura_idfactura:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'actividadesFactura',
});

facturaActividad.belongsTo(Factura, {foreignKey:'factura_idfactura',as: 'factura'});
Factura.hasMany(facturaActividad, {foreignKey:'factura_idfactura',as: 'actividadesFacturas'});

export default facturaActividad;