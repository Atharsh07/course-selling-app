const {Router} = require('express')
const adminRouter = Router();
const {adminModel} = require('../db.js')
const {z} = require('zod')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { JWT_ADMIN_PASSWORD } = require('../config.js');
    adminRouter.post('/sign-up',async function (req, res) {
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
                await adminModel.create({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword
                })
            } catch (error) {
                res.json({message: "admin already exists"})
                errThorwn = true;
            }
            if(!errThorwn){
                res.json({
                    message: "your signedUp as admin"
                })
            }
    })

    adminRouter.post('/sign-in', async function (req, res) {
            const{email, password} = req.body;
            const admin = await adminModel.findOne({email: email});
            const passwordMatched = await bcrypt.compare(password, admin.password);
            if (passwordMatched) {
                const token = JWT.sign(
                    { id: admin._id.toString() },
                    JWT_ADMIN_PASSWORD
                );
                return res.json({ message: token });
            } else {
                return res.status(403).json({ message: "Your password or email is incorrect." });
            }
    })

    adminRouter.post('/course', function (req, res) {

    })
    adminRouter.put('/course/create', function (req, res) {

    })
    adminRouter.get('/course/bulk', function (req, res) {

    })

module.exports = {
    adminRouter : adminRouter
}
