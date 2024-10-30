require('dotenv').config()
console.log(process.env.MONGO_URL)
const express = require("express");
const mongoose = require("mongoose");
const {userRouter} = require('./routes/user.js')
const {courseRouter} = require('./routes/course.js')
const {adminRouter} = require('./routes/admin.js')
const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("listening on port 3000")
}

main()
