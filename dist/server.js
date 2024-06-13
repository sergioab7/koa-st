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
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_body_1 = __importDefault(require("koa-body"));
const config_1 = __importDefault(require("./src/config"));
const connectDB_1 = __importDefault(require("./src/DB/connectDB"));
const app = new koa_1.default();
app.use((0, koa_body_1.default)({
    multipart: true
}));
const PORT = config_1.default.PORT || 3002;
const router = new koa_router_1.default();
router.get("/", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = "Server running ok";
}));
router.post("/register", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, email, password } = ctx.request.body;
    if (!usuario || !email || !password) {
        ctx.body = `[-] Error, debes poner el nombre de usuario, email y password.`;
        ctx.status = 400;
    }
    else {
        const query = `
            INSERT INTO usuarios (nombre, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [usuario, email, password];
        try {
            const addBBDD = connectDB_1.default.query(query, values);
            if (!addBBDD) {
                ctx.body = "[-] Error la agregar a la BBDD!";
                ctx.status = 400;
            }
            else {
                ctx.body = "[+] Has agregado correctamente!";
                ctx.status = 201;
            }
        }
        catch (error) {
            ctx.body = error;
            ctx.status = 500;
        }
    }
}));
// Dont touch
app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(PORT, () => {
    console.log(`[+] Puerto en escucha: ${PORT}`);
});
