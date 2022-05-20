const { request } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require("./SignUpModel")
const { MongoClient } = require('mongodb')
const ObjectId = require('mongodb').ObjectId
require("dotenv").config()
const { DATABASE_ACCESS } = process.env
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const bcrypt = require('bcrypt');
router.post('/signup', (request, res) => {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(request.body.password, saltRounds, function (err, hash) {

        if (!err) { return hash }
        else {
            res.status(500).json()
        }
    })
    const signedUpUser = new signUpTemplateCopy({
        ...request.body, password: hashedPassword
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
router.post('/getuser/:email', async (req, res) => {
    try {
        const { params: { email }, body: { password } } = req

        const client = new MongoClient(
            DATABASE_ACCESS, options
        )
        await client.connect()
        const database = client.db("users")
        const user = await database.collection("users").findOne({ email: email })
        // console.log(user)
        console.log(password)
        // console.log(typeof user.password)
        const isAuthenticated = bcrypt.compareSync(password, user.password, function (err, result) {
            if (!err) { return result }
            else {
                res.status(500).json()
            }
        });
        if (isAuthenticated) {
            res.status(200).json({ message: "User info", data: user })
        }
        else { res.status(403).json({ message: "password incorrect" }) }
        console.log(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
});

router.get('/getallusers', async (req, res) => {
    const client = new MongoClient(DATABASE_ACCESS, options);

    await client.connect();

    const db = client.db("users");
    const result = await db.collection("users").find().toArray();

    if (result.length > 0) {
        return res.status(200).json({
            status: 200,
            data: result,
            message: "All users",
        });
    } else {
        return res.status(404).json({
            status: 404,
            message: `fail`,
        });
    }
});

router.patch('/follow', async (req, res) => {
    const { following, user } = req.body;

    const client = new MongoClient(DATABASE_ACCESS, options);

    await client.connect();

    const db = client.db("users");

    const follow = await db
        .collection("users")
        .updateOne(
            { _id: ObjectId(user) },
            { $push: { following: ObjectId(following) } }
        );
    console.log(req.body)
    if (follow.modifiedCount !== 0) {
        const updated = await db
            .collection("users")
            .updateOne(
                { _id: ObjectId(following) },
                { $push: { followers: ObjectId(user) } }
            );
        if (updated.modifiedCount !== 0) {
            res.status(200).json({
                status: 200,
                message: " followed",

            });
        } else {
            res.status(404).json({
                status: 404,
                message: "not follow ",

            });
        }
    } else {
        res.status(404).json({
            status: 404,
            message: " not follow",

        });
    }
});

router.patch('/unfollow', async (req, res) => {
    const { unfollowing, user } = req.body;

    const client = new MongoClient(DATABASE_ACCESS, options);

    await client.connect();

    const db = client.db("users");

    const unfollow = await db
        .collection("users")
        .updateOne(
            { _id: ObjectId(user) },
            { $pull: { following: ObjectId(unfollowing) } }
        );
    console.log(req.body)
    if (unfollow.modifiedCount !== 0) {
        const updated = await db
            .collection("users")
            .updateOne(
                { _id: ObjectId(unfollowing) },
                { $pull: { followers: ObjectId(user) } }
            );
        if (updated.modifiedCount !== 0) {
            res.status(200).json({
                status: 200,
                message: " unfollowed",

            });
        } else {
            res.status(404).json({
                status: 404,
                message: "not unfollow ",

            });
        }
    } else {
        res.status(404).json({
            status: 404,
            message: " it's not unfollow",

        });
    }
});

router.get('/getuserprofile/:userName', async (req, res) => {
    const userName = req.params.userName
    const client = new MongoClient(
        DATABASE_ACCESS, options
    )
    await client.connect()
    const database = client.db("users")
    const user = await database.collection("users").findOne({ userName: userName })
    if (user) {
        res.status(200).json({ status: 200, message: "User info", data: user })
    } else (res.status(400).json({ status: 400, message: "fail", data: user }))

    console.log(user)
});

router.get('/getfollower/:_id', async (req, res) => {
    const _id = req.params._id
    const client = new MongoClient(
        DATABASE_ACCESS, options
    )
    await client.connect()
    const database = client.db("users")
    const user = await database.collection("users").findOne({ _id: ObjectId(_id) })
    res.status(200).json({ message: "User info", data: user })

});
module.exports = router