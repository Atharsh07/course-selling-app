const {Router} = require('express')
const adminRouter = Router();
const {adminModel, courseModel} = require('../db.js')
const {z} = require('zod')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { JWT_ADMIN_PASSWORD } = require('../config.js');
const { adminMiddleware } = require('../middleware/admin.js');

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

    adminRouter.post('/course/create', adminMiddleware,  async function (req, res) {
            const adminId = req.userId;
            const {title, description, price, imageUrl} = req.body;
            const course = await courseModel.create({
                title: title,
                description: description,
                price: price,
                imageUrl: imageUrl,
                creatorId: adminId
            })
            res.json({
                message: "course created",
                courseId: course._id
            })
    })
    adminRouter.put('/course/update', adminMiddleware, async function (req, res) {
            const adminId = req.userId;
            const {title, description, price, imageUrl, courseId} = req.body
            const course = await courseModel.updateOne({
                _id: courseId,
                creatorId: adminId
            },{
                title: title,
                description: description,
                price: price,
                imageUrl: imageUrl,
            })
            res.json({
                message: "course updated",
                courseId: course._id
            })
    })
    adminRouter.get('/course/bulk',adminMiddleware, async function (req, res) {
            const adminId = req.userId;
            const course = await courseModel.find({
                creatorId: adminId
            });
            res.json({
                messaage: "view all",
                course
            })
    })

module.exports = {
    adminRouter : adminRouter
}
