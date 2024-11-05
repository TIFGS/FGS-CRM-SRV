import db from '../db/connection';
import { DataTypes } from 'sequelize';
import clientePlanta from './clientePlanta';

const Prospeccion = db.define('prospeccion', {
    idprospecciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idprospecciones'
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
    estado:{
        type: DataTypes.STRING,
    },
    fechafin:{
        type: DataTypes.DATE,
    },
    probabilidad:{
        type: DataTypes.INTEGER,
    },
    clientePlanta_idclientePlanta:{
        type: DataTypes.INTEGER,
    }
},{
    createdAt: false,
    updatedAt: false,
    tableName:'prospecciones',
    
});

Prospeccion.belongsTo(clientePlanta, {foreignKey: 'clientePlanta_idclientePlanta', as: 'clientePlanta'});
clientePlanta.hasOne(Prospeccion, {foreignKey: 'clientePlanta_idclientePlanta',as: 'prospeccion'});

export default Prospeccion;