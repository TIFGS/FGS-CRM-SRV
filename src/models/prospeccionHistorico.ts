import db from '../db/connection';
import { DataTypes } from 'sequelize';
import partes from './partes';
import Prospeccion from './prospeccion';

const prospeccionHistorico = db.define('historicosProspecciones', {
    idhistoricosProspecciones:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idhistoricosProspecciones'
    },
    cantidad:{
        type: DataTypes.INTEGER,
    },
    /*precioUni:{
        type: DataTypes.INTEGER,
    },
    precioTotal:{
        type: DataTypes.INTEGER,
    },*/
    version:{
        type: DataTypes.INTEGER,
    },
    partes_idpartes :{
        type: DataTypes.INTEGER,
    },
    prospecciones_idprospecciones :{
        type: DataTypes.INTEGER,
    }
},{
    createdAt: false,
    updatedAt: false,
    tableName:'historicosProspecciones'
});

prospeccionHistorico.belongsTo(Prospeccion, { foreignKey: 'prospecciones_idprospecciones',as:'prospeccion' });
Prospeccion.hasMany(prospeccionHistorico, { foreignKey: 'prospecciones_idprospecciones',as:'historicosProspecciones'});
prospeccionHistorico.belongsTo(partes,{foreignKey:'partes_idpartes',as:'parte'});
partes.hasOne(prospeccionHistorico,{foreignKey:'partes_idpartes',as:'historicosProspecciones'});

export default prospeccionHistorico;