"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const luxon_1 = require("luxon");
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../routes/user"));
const permiso_1 = __importDefault(require("../routes/permiso"));
const permusuario_1 = __importDefault(require("../routes/permusuario"));
const cotizacion_1 = __importDefault(require("../routes/cotizacion"));
const cliente_1 = __importDefault(require("../routes/cliente"));
const factura_1 = __importDefault(require("../routes/factura"));
const prealta_1 = __importDefault(require("../routes/prealta"));
const alta_1 = __importDefault(require("../routes/alta"));
const prospeccion_1 = __importDefault(require("../routes/prospeccion"));
const oportunidad_1 = __importDefault(require("../routes/oportunidad"));
const oportunidadHistorico_1 = __importDefault(require("../routes/oportunidadHistorico"));
const prospeccionHistorico_1 = __importDefault(require("../routes/prospeccionHistorico"));
const cotizacionHistorico_1 = __importDefault(require("../routes/cotizacionHistorico"));
const prealtaHistorico_1 = __importDefault(require("../routes/prealtaHistorico"));
const altaHistorico_1 = __importDefault(require("../routes/altaHistorico"));
const facturaHistorico_1 = __importDefault(require("../routes/facturaHistorico"));
const oportunidadActividad_1 = __importDefault(require("../routes/oportunidadActividad"));
const prospeccionActividad_1 = __importDefault(require("../routes/prospeccionActividad"));
const cotizacionActividad_1 = __importDefault(require("../routes/cotizacionActividad"));
const prealtaActividad_1 = __importDefault(require("../routes/prealtaActividad"));
const altaActividad_1 = __importDefault(require("../routes/altaActividad"));
const facturaActividad_1 = __importDefault(require("../routes/facturaActividad"));
const partes_1 = __importDefault(require("../routes/partes"));
const clientePlanta_1 = __importDefault(require("../routes/clientePlanta"));
const planta_1 = __importDefault(require("../routes/planta"));
const vendedor_1 = __importDefault(require("../routes/vendedor"));
const oportunidadesProspecciones_1 = __importDefault(require("../routes/oportunidadesProspecciones"));
const prospeccionesCotizaciones_1 = __importDefault(require("../routes/prospeccionesCotizaciones"));
const cotizacionesPrealta_1 = __importDefault(require("../routes/cotizacionesPrealta"));
const cotizacionesAlta_1 = __importDefault(require("../routes/cotizacionesAlta"));
const prealtaAlta_1 = __importDefault(require("../routes/prealtaAlta"));
const altaFactura_1 = __importDefault(require("../routes/altaFactura"));
const marca_1 = __importDefault(require("../routes/marca"));
const area_1 = __importDefault(require("../routes/area"));
const tableroResultados_1 = __importDefault(require("../routes/tableroResultados"));
const resultadosDocumentos_1 = __importDefault(require("../routes/resultadosDocumentos"));
const connection_1 = __importDefault(require("../db/connection"));
//import cors from 'cors';
const dotenv = require('dotenv').config();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//const dirname = "https://dev.forzaglobal.com/crm/devKEY.pem";
const path = __importStar(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class Server {
    constructor() {
        //dotenv.config();
        //this.app = express();
        //private app: express.Application;
        this.app = (0, express_1.default)();
        console.log("Inicio Servidor", this.obtenerFechaActualMX());
        this.port = process.env.PORT || '3002';
        //this.port = process.env.PORT!||'3001';
        let direccion = process.cwd();
        this.options = {
            cert: fs.readFileSync(path.join(direccion, './CRT.pem'), {
                encoding: 'utf-8',
            }),
            key: fs.readFileSync(path.join(direccion, './KEY.pem'), {
                encoding: 'utf-8',
            }),
        };
        this.app.use(new cors({
            //origin: 'https://crm.forzaglobal.com',
            //origin: 'https://dev.forzaglobal.com',
            origin: process.env.CORS_ORIGIN,
            credentials: true
        }));
        //console.log("Cors",process.env.CORS_ORIGIN!,)
        this.server = https.createServer(this.options, this.app);
        this.server.listen(this.port, () => {
            try {
                this.midlewares();
                this.routes();
                this.dbConnect();
            }
            catch (error) {
                console.error("Error en el listen", this.obtenerFechaActualMX());
                console.error(error);
            }
        });
        //this.listen();
        /*this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();*/
    }
    ngOnInit() {
        this.app.use((0, cookie_parser_1.default)());
    }
    obtenerFechaActualMX() {
        const mexicoCity = luxon_1.DateTime.now().setZone('America/Mexico_City');
        return mexicoCity.toFormat('yyyy-LL-dd HH:mm:ss');
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API WORKING',
                //dotenv: dotenv,
                //procesenv: process.env,
            });
        });
        this.app.post('/sendMail', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const storage = multer.memoryStorage();
            const upload = multer({ storage: storage });
            try {
                const templatePath = './mailTest.html';
                //console.log("PATH",__dirname);
                const templateContent = fs.readFileSync(path.join(__dirname, './template/mailTest.html'), 'utf-8');
                const { from, name, sendername, subject, email, message, to, cc, bcc, header, comentarios } = req.body;
                // extra backend validation
                if (!from || !name || !sendername || !subject || !email || !message || !to || !cc || !bcc) {
                    return res.status(400).json({ error: 'Missing required fields', fields: req.body });
                }
                // store attachment if provided
                // create nodemailer transport
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                    secure: true,
                    auth: {
                        user: process.env.MAILTRAP_USER,
                        pass: process.env.MAILTRAP_PASS
                    }
                });
                // replace placeholders in the email template with received data
                const emailHtml = this.replacePlaceholders(templateContent, { email, to, name, sendername, subject, message, header, comentarios });
                // define the options of your email like to/from-headers, subject line, body text, html and attachment
                const mailOptions = {
                    from: from,
                    to: to,
                    cc: cc,
                    bcc: bcc,
                    subject: subject,
                    text: "",
                    html: emailHtml,
                };
                // store send mail response
                const info = yield transporter.sendMail(mailOptions);
                // provide console feedback and return a positive response to the client
                console.log('Email sent:', info.response);
                res.status(200).json({ msg: 'Email sent successfully' });
            }
            catch (error) {
                // provide error information in case there is any and send corresponding response
                console.error('Error sending email:', this.obtenerFechaActualMX());
                console.error(error);
                res.status(500).json({ msg: 'Error sending email' });
            }
        }));
        this.app.use('/api/user/', user_1.default);
        this.app.use('/api/permiso/', permiso_1.default);
        this.app.use('/api/permusuario/', permusuario_1.default);
        this.app.use('/api/alta/', alta_1.default);
        this.app.use('/api/cotizacion/', cotizacion_1.default);
        this.app.use('/api/cliente/', cliente_1.default);
        this.app.use('/api/factura/', factura_1.default);
        this.app.use('/api/oportunidad/', oportunidad_1.default);
        this.app.use('/api/prealta/', prealta_1.default);
        this.app.use('/api/prospeccion/', prospeccion_1.default);
        this.app.use('/api/oportunidadHistorico/', oportunidadHistorico_1.default);
        this.app.use('/api/prospeccionHistorico/', prospeccionHistorico_1.default);
        this.app.use('/api/cotizacionHistorico/', cotizacionHistorico_1.default);
        this.app.use('/api/prealtaHistorico/', prealtaHistorico_1.default);
        this.app.use('/api/altaHistorico/', altaHistorico_1.default);
        this.app.use('/api/facturaHistorico/', facturaHistorico_1.default);
        this.app.use('/api/oportunidadActividad/', oportunidadActividad_1.default);
        this.app.use('/api/prospeccionActividad/', prospeccionActividad_1.default);
        this.app.use('/api/cotizacionActividad/', cotizacionActividad_1.default);
        this.app.use('/api/prealtaActividad/', prealtaActividad_1.default);
        this.app.use('/api/altaActividad/', altaActividad_1.default);
        this.app.use('/api/facturaActividad/', facturaActividad_1.default);
        this.app.use('/api/partes/', partes_1.default);
        this.app.use('/api/clientePlanta/', clientePlanta_1.default);
        this.app.use('/api/planta/', planta_1.default);
        this.app.use('/api/vendedor/', vendedor_1.default);
        this.app.use('/api/oportunidadesProspecciones/', oportunidadesProspecciones_1.default);
        this.app.use('/api/prospeccionesCotizaciones/', prospeccionesCotizaciones_1.default);
        this.app.use('/api/cotizacionesPrealta/', cotizacionesPrealta_1.default);
        this.app.use('/api/cotizacionesAlta/', cotizacionesAlta_1.default);
        this.app.use('/api/prealtaAlta/', prealtaAlta_1.default);
        this.app.use('/api/altaFactura/', altaFactura_1.default);
        this.app.use('/api/marca/', marca_1.default);
        this.app.use('/api/area/', area_1.default);
        this.app.use('/api/tableroResultados/', tableroResultados_1.default);
        this.app.use('/api/resultadosDocumentos', resultadosDocumentos_1.default);
    }
    replacePlaceholders(html, data) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const placeholder = `{{${key}}}`;
                html = html.replace(new RegExp(placeholder, 'g'), data[key]);
            }
        }
        return html;
    }
    midlewares() {
        //Parsear el body
        this.app.use(express_1.default.json());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos conectada');
            }
            catch (error) {
                console.error('Error al conectar la base de datos', error);
            }
        });
    }
}
exports.default = Server;
