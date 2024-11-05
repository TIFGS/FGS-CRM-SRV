import db from '../db/connection';
import { DataTypes } from 'sequelize';
import clientePlanta from './clientePlanta';

const Alta = db.define('alta', {
    idalta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idalta'
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
    tableName:'alta',
    
});

Alta.belongsTo(clientePlanta, {foreignKey: 'clientePlanta_idclientePlanta',as: 'clientePlanta'});
clientePlanta.hasOne(Alta, {foreignKey: 'clientePlanta_idclientePlanta',as: 'alta'});

export default Alta;