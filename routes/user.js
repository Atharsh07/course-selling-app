const {Router} = require('express');
const {userModel, purchaseModel, courseModel} = require('../db.js')
const userRouter = Router()

    userRouter.post('/sign-up', async function (req, res) {
    })
    userRouter.post('/sign-in', function (req, res) {

    })
    userRouter.get('/purchases', function (req, res) {

    })

module.exports = {
    userRouter:userRouter
}
