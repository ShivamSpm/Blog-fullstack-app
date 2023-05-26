import mysql from "mysql2"
import databasePass from "./config.js"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: databasePass,
    database:"blog"
})