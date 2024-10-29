const express = require('express');
const app = express();


app.post('/user/signup', function (req, res) {
    res.json({
        message: 'sigup endpoint'
    })
})
app.post('/user/sigin', function (req, res) {
    res.json({
        message: 'sigin endpoint'
    })
})
app.post('/user/buy', function (req, res) {
    res.json({
        message: 'buy endpoint'
    })
})
app.get('/course/purchases', function (req,res) {
    res.json({
        message: 'purchases endpoint'
    })
})
app.get('/course/preview', function (req, res) {
    res.json({
        message: 'courses endpoint'
    })
})



app.listen(3000);
