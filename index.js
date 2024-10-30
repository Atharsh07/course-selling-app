const express = require('express');
const app = express();
const {userRouter} = require('./routes/user.js')
const {courseRouter} = require('./routes/course.js')
const {adminRouter} = require('./routes/admin.js')
app.use('/users', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);
app.listen(3000);
