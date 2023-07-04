import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "travel_planner"
})

app.use(express.json())
app.use(cors())

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

app.post("/books", (req, res) => {
    const q = "insert into books (`title`,`desc`,`cover`, `price`) values (?)"
    const values = [ req.body.title, req.body.desc, req.body.cover, req.body.price ]

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("book has been created");
    })
})

app.listen(8800, () => {
    console.log("connected to backend!!")
})