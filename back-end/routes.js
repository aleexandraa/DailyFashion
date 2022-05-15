const { request } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require("./SignUpModel")

router.post('/singup', (request, res) => {
    const signedUpUser = new signUpTemplateCopy({
        fullName: request.body.fullName,
        userName: request.body.userName,
        email: request.body.email,
        password: request.body.password
    })
    signedUpUser.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})



module.exports = router