import mysql from "mysql2"
import databasePass from "./config.js"

export const db = mysql.createConnection({
    host:"sql9.freesqldatabase.com",
    user:"sql9624101",
    password: databasePass,
    database:"sql9624101"
})