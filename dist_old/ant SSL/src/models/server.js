"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../routes/user"));
const permiso_1 = __importDefault(require("../routes/permiso"));
const permusuario_1 = __importDefault(require("../routes/permusuario"));
const cotizacion_1 = __importDefault(require("../routes/cotizacion"));
const factura_1 = __importDefault(require("../routes/factura"));
const prealta_1 = __importDefault(require("../routes/prealta"));
const alta_1 = __importDefault(require("../routes/alta"));
const prospeccion_1 = __importDefault(require("../routes/prospeccion"));
const oportunidad_1 = __importDefault(require("../routes/oportunidad"));
const connection_1 = __importDefault(require("../db/connection"));
//import cors from 'cors';
const cors = require('cors');
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    ngOnInit() {
        this.app.use((0, cookie_parser_1.default)());
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API WORKING'
            });
        });
        this.app.use('/api/user/', user_1.default);
        this.app.use('/api/permiso/', permiso_1.default);
        this.app.use('/api/permusuario/', permusuario_1.default);
        this.app.use('/api/alta/', alta_1.default);
        this.app.use('/api/cotizacion/', cotizacion_1.default);
        this.app.use('/api/factura/', factura_1.default);
        this.app.use('/api/oportunidad/', oportunidad_1.default);
        this.app.use('/api/prealta/', prealta_1.default);
        this.app.use('/api/prospeccion/', prospeccion_1.default);
    }
    midlewares() {
        //Parsear el body
        this.app.use(express_1.default.json());
        this.app.use(cors({
            origin: ['https://dev.forzaglobal.com:80', 'http://dev.forzaglobal.com:80', 'https://dev.forzaglobal.com:3001', 'http://dev.forzaglobal.com:3001'],
            credentials: true
        }));
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos conectada');
            }
            catch (error) {
                console.log('Error al conectar la base de datos');
            }
        });
    }
}
exports.default = Server;
