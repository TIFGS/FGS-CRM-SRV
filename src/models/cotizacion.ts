import db from '../db/connection';
import { DataTypes } from 'sequelize';
import clientePlanta from './clientePlanta';
import cotizacionActividad from './cotizacionActividad';
import cotizacion from '../routes/cotizacion';
import cotizacionHistorico from './cotizacionHistorico';


const Cotizacion = db.define('cotizaciones', {
    idcotizaciones:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcotizaciones'
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
    fechaActualizacion:{
        type: DataTypes.DATE,
    },
    fechaColocacion:{
        type: DataTypes.DATE,
    },
    moneda:{
        type: DataTypes.STRING,
    },
    tipoCambio:{
        type: DataTypes.DECIMAL,
    },
    probabilidad:{
        type: DataTypes.INTEGER,
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
    tableName:'cotizaciones',
});

Cotizacion.belongsTo(clientePlanta, {foreignKey: 'clientePlanta_idclientePlanta',as: 'clientePlanta'});
clientePlanta.hasOne(Cotizacion, {foreignKey: 'clientePlanta_idclientePlanta',as: 'cotizacion'});


export default Cotizacion;