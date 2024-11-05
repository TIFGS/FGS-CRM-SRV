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
exports.authToken = exports.logout = exports.updateUser = exports.deleteUser = exports.login = exports.postUser = exports.getUser = exports.getAllUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listAlumnos = yield user_1.default.findAll();
    res.json(listAlumnos);
});
exports.getAllUser = getAllUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alumno = yield user_1.default.findByPk(id);
    res.json(alumno);
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el usuario ya está registrado
    const existingUser = yield user_1.default.findOne({ where: { username: req.body.username } });
    if (existingUser)
        return console.log('El usuario ya está registrado');
    // Generar el hash de la contraseña
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
    const newUser = { username: req.body.username, password: hashedPassword };
    // Crear el nuevo usuario en la base de datos
    yield user_1.default.create(newUser);
    res.json({
        msg: 'El usuario se agrego con exito!'
    });
    console.log('Usuario registrado correctamente');
});
exports.postUser = postUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    try {
        const usuario = yield user_1.default.findOne({ where: { username: username } });
        if (usuario) {
            // Comprobar si la contraseña coincide
            const passwordMatch = yield bcrypt_1.default.compare(req.body.password, usuario.dataValues['password']);
            if (passwordMatch) {
                const cookieOptions = {
                    httpOnly: true,
                    maxAge: 10,
                    sameSite: 'strict',
                };
                const token = jsonwebtoken_1.default.sign({ userId: usuario.dataValues['id'], username: usuario.dataValues['username'] }, 'secreto', { expiresIn: '1h' });
                res.cookie('fgs0102', token, cookieOptions).json({ token });
            }
            else {
                res.json(1); //'Usuario y/o contraseña incorrecta'
            }
        }
        else {
            res.json(1); // 'No se encontró el usuario'
        }
    }
    catch (error) {
        res.json(2); //'Error al buscar el usuario' 
    }
});
exports.login = login;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alumno = yield user_1.default.findByPk(id);
    if (!alumno) {
        res.status(404).json({
            msg: `No se encontro ningun usuario con id ${id}`
        });
    }
    else {
        yield alumno.destroy();
        res.json({
            msg: `El usuario fue eliminado con exito!`
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const usuario = yield user_1.default.findByPk(id);
    if (usuario) {
        const existingUser = yield user_1.default.findOne({ where: { username: req.body.username } });
        if (!existingUser || req.body.username == usuario.dataValues.username) {
            if (req.body.password != '') {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
                const UpUser = { username: req.body.username, password: hashedPassword };
                yield usuario.update(UpUser);
            }
            else
                yield usuario.update({ username: req.body.username });
            res.json(1); //'El usuario se actualizo con exito!'
        }
        else {
            res.json(2); //'El nombre de usuario que ingreso ya esta registrado'
        }
    }
    else {
        res.json(3); //`No se encontro ningun usuario con id ${id}`
    }
});
exports.updateUser = updateUser;
// POST /logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Eliminar token de autenticación de la sesión actual
        res.clearCookie('fgs0102');
        // Redirigir al usuario a la página de inicio de sesión
        res.redirect('/');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al cerrar sesión');
    }
});
exports.logout = logout;
// Middleware de autenticación
const authToken = (req, res, next) => {
    //const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del encabezado de autorización
    //console.log(res.json().getHeader('Set-cookie'));
    /*if (!token) {
      return console.log('Token no proporcionado');
    }
  
    try {
      const decoded = jwt.verify(token, 'secreto') as JwtPayload; // Decodificar el token
      const userId = decoded.userId; // Obtener el userId del objeto decodificado
  
      req.body.userId = userId; // Asignar el userId al cuerpo de la solicitud
      next();
    } catch (error) {
    */ 
};
exports.authToken = authToken;
