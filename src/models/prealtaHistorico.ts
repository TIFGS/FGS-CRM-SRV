import db from '../db/connection';
import { DataTypes } from 'sequelize';
import partes from './partes';
import Prealta from './prealta';

const prealtaHistorico = db.define('historicosPrealta', {
    idhistoricosPrealta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idhistoricosPrealta'
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
    partes_idpartes:{
        type: DataTypes.INTEGER,
    },
    prealta_idprealta:{
        type: DataTypes.INTEGER,
    }
},{
    createdAt: false,
    updatedAt: false,
    tableName: 'historicosPrealta',
});

prealtaHistorico.belongsTo(Prealta, { foreignKey: 'prealta_idprealta',as: 'prealta' });
Prealta.hasMany(prealtaHistorico, { foreignKey: 'prealta_idprealta',as: 'historicosPrealta' });
prealtaHistorico.belongsTo(partes,{foreignKey:'partes_idpartes',as: 'parte'});
partes.hasOne(prealtaHistorico,{foreignKey:'partes_idpartes',as: 'historicosPrealta'});

export default prealtaHistorico;