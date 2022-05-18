const { request } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require("./SignUpModel")
const { MongoClient } = require('mongodb')
require("dotenv").config()
const { DATABASE_ACCESS } = process.env
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
router.post('/signup', (request, res) => {
    const signedUpUser = new signUpTemplateCopy({
        fullName: request.body.fullName,
        userName: request.body.userName,
        email: request.body.email,
        password: request.body.password,
        followers: request.body.followers,
        following: request.body.following,
        pictures: request.body.pictures
    })
    signedUpUser.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})
router.post('/savepicture', async (req, res) => {
    const client = new MongoClient(
        DATABASE_ACCESS, options
    )
    await client.connect()
    const database = client.db("users")
    const uploadPicture = await database.collection("users").updateOne({ email: req.body.email },
        { $push: { pictures: req.body.picture } })
    res.status(200).json({ message: "Pictures posted" })
})
router.get('/getuser/:email', async (req, res) => {
    const email = req.params.email
    const client = new MongoClient(
        DATABASE_ACCESS, options
    )
    await client.connect()
    const database = client.db("users")
    const user = await database.collection("users").findOne({ email: email })
    res.status(200).json({ message: "User info", data: user })
    console.log(user)
})

module.exports = router