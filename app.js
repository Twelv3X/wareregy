const connection = require("./operators/mySQL");
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const queries = require("./operators/queries")
const utilizador = require("./models/utilizador")
const app = new express();

//Handlebars
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use("/static",express.static("public"));

//Api
app.use("/", require("./api/api"))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get("/login",(req,res)=>
{
    res.render('login', {layout: 'login.hbs'});
});

//Login Form POST
app.post('/login', async function(request, response) {
    var useremail = request.body.useremail;
    var userpassword = request.body.userpassword;
    if (useremail && userpassword) {
        let query = new queries();
        results = await query.verificarUtilizador(useremail,userpassword);

        if (results.length > 0){
            let user = new utilizador(results[0].id, results[0].user_nome, results[0].user_email, results[0].user_privilegio);
            request.session.name = user.nome; 
            request.session.loggedin = true;
            request.session.useremail = useremail;
            response.redirect('/index');
        } else {
            response.render('login', {
            message: 'Invalid username or password',
            messageClass: 'alert-danger',
            layout: 'login.hbs'
            });
        }           
    };
});

app.get('/index',(req,res)=>{
    if (req.session.loggedin) {
        res.render("home",{
            name: req.session.name});
    } else {
        res.redirect('/login');
    }
});

app.get('/registar',(req,res)=>{
    if (req.session.loggedin) {
        //res.sendFile(path.join(__dirname,"public","index.html"));
        res.render("registar");
    } else {
        res.redirect('/login');
    }
});

app.get('/produtos',(req,res)=>{
    if (req.session.loggedin) {
        //res.sendFile(path.join(__dirname,"public","index.html"));
        res.render("produtos");
    } else {
        res.redirect('/login');
    }
});

app.get('/incidencias',(req,res)=>{
    if (req.session.loggedin) {
        //res.sendFile(path.join(__dirname,"public","index.html"));
        res.render("incidencias");
    } else {
        res.redirect('/login');
    }
});

app.get('/estatisticas',(req,res)=>{
    if (req.session.loggedin) {
        //res.sendFile(path.join(__dirname,"public","index.html"));
        res.render("estatisticas");
    } else {
        res.redirect('/login');
    }
});

app.get('/eventos',(req,res)=>{
    if (req.session.loggedin) {
        //res.sendFile(path.join(__dirname,"public","index.html"));
        res.render("eventos");
    } else {
        res.redirect('/login');
    }
});

app.get('/logout',(req,res)=>{
    req.session.loggedin = false;
    res.redirect('/login');
   })

app.listen(3000,(err)=>
{
    console.log("Running...");
});