import {Pool} from "pg";
import config from "../config";

const pool = new Pool({
    user:config.POSTGRES_USER,
    host:config.POSTGRES_HOST,
    database:config.POSTGRES_DATABASE,
    password:config.POSTGRES_PASSWORD,
    port:config.POSTGRES_PORT as any
})

export default pool;