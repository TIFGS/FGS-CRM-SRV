import db from '../db/connection';
import { DataTypes } from 'sequelize';
import clientePlanta from './clientePlanta';

const Factura = db.define('factura', {
    idfactura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idfactura'
    },
    numero:{
        type: DataTypes.INTEGER,
    },
    titulo:{
        type: DataTypes.STRING,
    },
    descripcion:{
        type: DataTypes.STRING,
    },
    fechaini:{
        type: DataTypes.DATE,
    },
    fechaColocacion:{
        type: DataTypes.DATE,
    },
    estado:{
        type: DataTypes.STRING,
    },
    probabilidad:{
        type: DataTypes.INTEGER,
    },
    productOrder:{
        type: DataTypes.STRING,
    },
    contrato:{
        type: DataTypes.STRING,
    },
    numeroAlta:{
        type: DataTypes.STRING,
    },
    tipo:{
        type: DataTypes.STRING,
    },
    peso:{
        type: DataTypes.DECIMAL,
    },
    parcialidad:{
        type: DataTypes.STRING,
    },
    conceptoFactura:{
        type: DataTypes.STRING,
    },
    terminoPago:{
        type: DataTypes.INTEGER,
    },
    otro:{
        type: DataTypes.STRING,
    },
    adenda:{
        type: DataTypes.STRING,
    },
    impuestos:{
        type: DataTypes.DECIMAL,
    },
    comision:{
        type: DataTypes.DECIMAL,
    },
    ganancia:{
        type: DataTypes.DECIMAL,
    },
    clientePlanta_idclientePlanta:{
        type: DataTypes.INTEGER,
    }
},{
    createdAt: false,
    updatedAt: false,
    tableName: 'factura',
});

Factura.belongsTo(clientePlanta, {foreignKey: 'clientePlanta_idclientePlanta',as: 'clientePlanta'});
clientePlanta.hasOne(Factura, {foreignKey: 'clientePlanta_idclientePlanta',as: 'factura'});

export default Factura;