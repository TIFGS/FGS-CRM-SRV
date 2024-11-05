import db from '../db/connection';
import { DataTypes } from 'sequelize';
import partes from './partes';
import Alta from './alta';

const altaHistoricos = db.define('historicosAlta', {
    idhistoricosAlta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idhistoricosAlta'
    },  
    numItem:{
        type: DataTypes.STRING,
    },
    cantidad:{
        type: DataTypes.DECIMAL,
    },
    UMedida:{
        type: DataTypes.STRING,
    },
    parteCliente:{
        type: DataTypes.STRING,
    },
    concepto:{
        type: DataTypes.STRING,
    },
    material:{
        type: DataTypes.STRING,
    },
    foam:{
        type: DataTypes.STRING,
    },
    calibre:{
        type: DataTypes.STRING,
    },
    color:{
        type: DataTypes.STRING,
    },
    observaciones:{
        type: DataTypes.STRING,
    },
    precioUni:{
        type: DataTypes.DECIMAL,
    },
    Tooling:{
        type:DataTypes.DECIMAL,
    },
    Replica:{
        type:DataTypes.DECIMAL,
    },
    Prototipo:{
        type:DataTypes.DECIMAL,
    },
    Flete:{
        type:DataTypes.DECIMAL,
    },
    Dibujo:{
        type:DataTypes.DECIMAL,
    },
    Desarrollo:{
        type:DataTypes.DECIMAL,
    },
    ReplicaMateriales:{
        type:DataTypes.DECIMAL,
    },
    ReplicaObra:{
        type:DataTypes.DECIMAL,
    },
    Empaque:{
        type:DataTypes.DECIMAL,
    },
    Validacion:{
        type:DataTypes.DECIMAL,
    },
    precioTotal:{
        type: DataTypes.DECIMAL,
    },
    version:{
        type: DataTypes.DECIMAL,
    },
    partes_idpartes :{
        type: DataTypes.INTEGER,
    },
    alta_idAlta :{
        type: DataTypes.INTEGER,
    }
},{
    createdAt: false,
    updatedAt: false,
    tableName:'historicosAlta',    
});

altaHistoricos.belongsTo(Alta, { foreignKey: 'alta_idAlta', as: 'alta'});
Alta.hasMany(altaHistoricos, { foreignKey: 'alta_idAlta',as: 'historicosAlta'});
altaHistoricos.belongsTo(partes,{foreignKey:'partes_idpartes',as: 'parte'});
partes.hasOne(altaHistoricos,{foreignKey:'partes_idpartes',as: 'historicosAlta'});

export default altaHistoricos;