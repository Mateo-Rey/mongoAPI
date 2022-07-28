import { MongoClient } from "mongodb"
import { uri } from "./dbsecrets.js"

import express from 'express'
import cors from 'cors'
const app = express()
const port = 4000

const client = new MongoClient(uri)
const db = client.db("sample_mflix")
const movieCollection = db.collection("movies")
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("trashstar")
})

app.listen(port, console.log(`Listening on port ${port}`))


app.get("/movies", (req, res) => {
    const query = {}

    movieCollection.find(query).limit(10).toArray((err,movies) => {
        res.status(200).json(movies)
    })
})

app.post("/movie", (req, res) => {
    const newMovie = req.body
    movieCollection.insertOne(newMovie,(err, results) => {
        if (err) {
            res.status(500).send.json({error:err})
        } else {
            res.status(201).json(results)
        }
    })
    
})