import Koa from "koa"
import Router from "koa-router"
import bodyParser from "koa-body"
import config from "./src/config";
import pool from "./src/DB/connectDB";

const app = new Koa();

app.use(bodyParser({
    multipart:true
}))

const PORT = config.PORT || 3002
const router = new Router();


router.get("/", async ctx => {
    ctx.body = "Server running ok"
})

router.post("/register", async ctx => {
    const {usuario,email,password} = ctx.request.body
    if(!usuario || !email || !password){
        ctx.body = `[-] Error, debes poner el nombre de usuario, email y password.`
        ctx.status = 400
    }else{
        const query = `
            INSERT INTO usuarios (nombre, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [usuario, email, password];
        try {
            const addBBDD = pool.query(query,values);
            if(!addBBDD){
                ctx.body = "[-] Error la agregar a la BBDD!"
                ctx.status = 400
            }else{
                ctx.body = "[+] Has agregado correctamente!"
                ctx.status = 201
            }
        } catch (error) {
            ctx.body = error
            ctx.status = 500
        }
    }
})

router.get("/show_users", async(ctx) => {
    const query = `
        SELECT nombre 
        FROM usuarios;
    `;
    const users = await pool.query(query);
    ctx.body = users.rows;
})

router.get("/user/:id", async(ctx) => {
    const id = ctx.params.id 
    ctx.body = id
})

// Dont touch
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`[+] Puerto en escucha: ${PORT}`)
})

export default app;