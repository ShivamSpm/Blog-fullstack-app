import mysql from "mysql"
import databasePass from "./config"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: databasePass,
    database:"blog"
})