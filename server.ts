import Koa from "koa"
import Router from "koa-router"
import config from "./src/config";

const app = new Koa();
const PORT = config.PORT || 3002
const router = new Router();


router.get("/", async ctx => {
    ctx.body = "Heyyyyyy"
})


app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`[+] Puerto en escucha: ${PORT}`)
})
