const {Router} = require('express');
<<<<<<< HEAD
const userRouter = Router();
const{userModel, purchaseModel} = require('../db.js')
const bcrypt = require('bcrypt');
const {z} = require('zod');
const JWT = require('jsonwebtoken')
const  { JWT_USER_PASSWORD } = require("../config");

    userRouter.post('/sign-up', async function (req, res) {
            const requireBody = z.object({
                email: z.string().min(3).max(100).email(),
                password: z.string().min(5).max(30),
                firstName: z.string().min(3).max(100),
                lastName: z.string().min(3).max(100)
            })
            const dataIsSuccess = requireBody.safeParse(req.body);
            if(!dataIsSuccess){
                res.json({
                    message: "Invalid format"
                })
                return
            }

            const{email, firstName, lastName, password} = req.body;
            let errThorwn = false;
            try {
                const saltround = 10;
                const hashedPassword = await bcrypt.hash(password, saltround)
                await userModel.create({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword
                })
            } catch (error) {
                res.json({message: "user already exists"})
                errThorwn = true;
            }
            if(!errThorwn){
                res.json({
                    message: "your signedUp"
                })
            }
=======
const {userModel, purchaseModel, courseModel} = require('../db.js')
const userRouter = Router()

    userRouter.post('/sign-up', async function (req, res) {
>>>>>>> 862ad85a096e4ed117aa91cb326e86c14b29b953
    })

    userRouter.post('/sign-in', async function (req, res) {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email: email });
            if (!user) {
                return res.status(403).json({
                    message: "User doesn't exist in the database."
                });
            }
            const passwordMatched = await bcrypt.compare(password, user.password);
            if (passwordMatched) {
                const token = JWT.sign(
                    { id: user._id.toString() },
                    JWT_USER_PASSWORD
                );
                return res.json({ message: token });
            } else {
                return res.status(403).json({ message: "Your password or email is incorrect." });
            }
    });


    userRouter.get('/purchases', function (req, res) {

    })


module.exports = {
    userRouter:userRouter
}
