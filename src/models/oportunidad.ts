import db from '../db/connection';
import { DataTypes } from 'sequelize';
import clientePlanta from './clientePlanta';
import cotizacionHistorico from './oportunidadHistorico';

const Oportunidad = db.define('oportunidades', {
    idoportunidades: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idoportunidades'
    },
    titulo:{
        type: DataTypes.STRING,
    },
    numero:{
        type: DataTypes.INTEGER,
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
    fechaActualizacion:{
        type: DataTypes.DATE,
    },
    fechaColocacion:{
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
    tableName:'oportunidades',
    
});

Oportunidad.belongsTo(clientePlanta, {foreignKey: 'clientePlanta_idclientePlanta',as: 'clientePlanta'});
clientePlanta.hasOne(Oportunidad, {foreignKey: 'clientePlanta_idclientePlanta',as: 'oportunidad'});

export default Oportunidad;