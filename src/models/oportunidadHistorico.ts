import db from '../db/connection';
import { DataTypes } from 'sequelize';
import partes from './partes';
import Oportunidad from './oportunidad';

const oportunidadHistorico = db.define('historicoOportunidades', {
    idhistoricoOportunidades:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idhistoricoOportunidades'
    },
    /*cantidad:{
        type: DataTypes.INTEGER,
    },
    precioUni:{
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
    oportunidades_idoportunidades :{
        type: DataTypes.INTEGER,
    }
},{
    createdAt: false,
    updatedAt: false,
    
});

oportunidadHistorico.belongsTo(Oportunidad, { foreignKey: 'oportunidades_idoportunidades',as:'oportunidades' });
Oportunidad.hasMany(oportunidadHistorico, { foreignKey: 'oportunidades_idoportunidades',as:'historicoOportunidades' });
oportunidadHistorico.belongsTo(partes,{foreignKey:'partes_idpartes',as:'parte'});
partes.hasOne(oportunidadHistorico,{foreignKey:'partes_idpartes',as: 'historicoOportunidades'});

export default oportunidadHistorico;