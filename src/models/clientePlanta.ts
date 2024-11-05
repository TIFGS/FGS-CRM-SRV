import db from '../db/connection';
import { DataTypes } from 'sequelize';
import planta from './planta';
import cliente from './cliente';
import vendedor from './vendedor';


const clientePlanta = db.define('clientePlanta', {
    idclientePlanta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idclientePlanta'
    },
    estado:{
        type: DataTypes.STRING,
    },
    porcentajeRef:{
        type: DataTypes.DECIMAL,
    },
    planta_idplanta:{
        type: DataTypes.INTEGER,
    },
    cliente_idcliente:{
        type: DataTypes.INTEGER,
    },
    vendedor_idvendedor:{
        type: DataTypes.INTEGER,
    },
    vendedor_idvendedorRef:{
        type: DataTypes.INTEGER,
    },
},{
    createdAt: false,
    updatedAt: false,
    tableName:'clientePlanta',
    
});

clientePlanta.belongsTo(planta, {foreignKey: 'planta_idplanta',as: 'planta'});
clientePlanta.belongsTo(cliente, {foreignKey: 'cliente_idcliente',as: 'cliente'});
clientePlanta.belongsTo(vendedor, {foreignKey: 'vendedor_idvendedor',as: 'vendedor'});
clientePlanta.belongsTo(vendedor, {foreignKey: 'vendedor_idvendedorRef',as: 'vendedorRef'});
planta.hasMany(clientePlanta,{foreignKey: 'planta_idplanta', as: 'clientePlanta'});
cliente.hasMany(clientePlanta,{foreignKey: 'cliente_idcliente',as: 'clientePlanta'});
vendedor.hasMany(clientePlanta,{foreignKey: 'vendedor_idvendedor',as: 'clientePlanta'});
vendedor.hasMany(clientePlanta,{foreignKey: 'vendedor_idvendedorRef',as: 'clientePlantaRef'});

export default clientePlanta;
