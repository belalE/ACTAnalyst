const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
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
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get('/',(req,res) => {
    res.render('home');
})

app.get('/tests', async (req,res) => {
    const tests = await Test.find({});
    res.render('tests/index', {tests});
} )


app.get('/tests/new', async (req,res) => {
    res.render('tests/new');
} )

app.post('/tests', async (req,res) => {
    const test = new Test(req.body.test);
    await test.save();
    res.redirect(`/tests/${test._id}`);
} )

app.get('/tests/:id', async (req,res) => {
    const {id} = req.params;
    const test = await Test.findById(id);
    res.render('tests/show', {test});
} )

app.get('/tests/:id/edit', async (req,res) => {
    const {id} = req.params;
    const test = await Test.findById(id);
    res.render('tests/edit', {test});
} )

app.put('/tests/:id', async (req,res) => {
    const {id} = req.params;
    console.log('id:', id)
    const test = await Test.findByIdAndUpdate(id, req.body.test);
    res.redirect(`/tests/${test._id}`);
} )

app.delete('/tests/:id', async (req,res) => {
    const {id} = req.params;
    await Test.findByIdAndDelete(id);
    res.redirect('/tests')
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
})