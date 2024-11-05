import db from '../db/connection';
import { DataTypes } from 'sequelize';
import clientePlanta from './clientePlanta';

const Prealta = db.define('prealta', {
    idprealta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idprealta'
    },
    titulo:{
        type: DataTypes.STRING,
    },
    fechaActualizacion:{
        type: DataTypes.DATE,
    },
    tipo:{
        type: DataTypes.STRING,
    },
    estilo:{
        type: DataTypes.STRING,
    },
    entrada:{
        type: DataTypes.STRING,
    },
    nombre:{
        type: DataTypes.STRING,
    },
    tipoAlta:{
        type: DataTypes.STRING,
    },
    numeroAlta:{
        type: DataTypes.STRING,
    },
    numeroPreAlta:{
        type: DataTypes.STRING,
    },
    liberacionProduccion:{
        type: DataTypes.STRING,
    },
    productOrder:{
        type: DataTypes.STRING,
    },
    materialEmpaque:{
        type: DataTypes.STRING,
    },
    conceptoDigital:{
        type: DataTypes.DATE,
    },
    prototipo:{
        type: DataTypes.DATE,
    },
    entregaProduccion:{
        type: DataTypes.DATE,
    },
    dibujos:{
        type: DataTypes.STRING,
    },
    modalidadDibujo:{
        type: DataTypes.STRING,
    },
    numeroParte:{
        type: DataTypes.STRING,
    },
    entregable:{
        type: DataTypes.STRING,
    },
    Notas:{
        type: DataTypes.STRING,
    },
    operacion:{
        type: DataTypes.STRING,
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
    tableName:'prealta',
});

Prealta.belongsTo(clientePlanta, {foreignKey: 'clientePlanta_idclientePlanta',as: 'clientePlanta'});
clientePlanta.hasOne(Prealta, {foreignKey: 'clientePlanta_idclientePlanta',as: 'prealta'});

export default Prealta;