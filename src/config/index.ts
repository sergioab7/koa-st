import dotenv from "dotenv"

const fileExists = dotenv.config()

if(!fileExists){
    throw new Error("[-] Error. File .env doesn't exists")
}

export default {
    PORT: process.env.PORT || 3002
}