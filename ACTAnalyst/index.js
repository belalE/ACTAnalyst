const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Test = require('./models/test');

mongoose.connect('mongodb://localhost:27017/act-analyst', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("database connected")
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res) => {
    res.render('home');
})

app.get('/maketest', async (req,res) => {
    const test = new Test({form: 'B05', type: 'M'});
    await test.save();
    res.send(test);
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
})