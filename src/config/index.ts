import dotenv from "dotenv"

const fileExists = dotenv.config()

if(!fileExists){
    throw new Error("[-] Error. File .env doesn't exists")
}

export default {
    PORT: process.env.PORT || 3002,
    POSTGRES_USER:process.env.POSTGRES_USER,
    POSTGRES_PASSWORD:process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE:process.env.POSTGRES_DATABASE,
    POSTGRES_HOST:process.env.POSTGRES_HOST,
    POSTGRES_PORT:process.env.POSTGRES_PORT,
}