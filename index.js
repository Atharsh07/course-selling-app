const express = require('express');
const app = express();
const {userRouter, courseRouter} = require('./routes/user.js')

app.use('/users', userRouter);
app.user('/course', courseRouter)
app.listen(3000);
