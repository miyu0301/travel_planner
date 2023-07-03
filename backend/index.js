import express from "express"
import mysql from "mysql"
const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "travel_planner"
})

app.get("/", (req, res) => {
    res.json("hello")
})

app.get("/books", (req, res) => {
    const q = "select * from books"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, () => {
    console.log("connected to backend!!")
})