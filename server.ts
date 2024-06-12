import Koa from "koa"
import Router from "koa-router"
import bodyParser from "koa-body"
import config from "./src/config";

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
    ctx.body = {
        usuario,
        email,
        password
    }
})



// Dont touch
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`[+] Puerto en escucha: ${PORT}`)
})
