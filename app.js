const connection = require("./operators/mySQL");
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const queries = require("./operators/queries")
const utilizador = require("./models/utilizador")
const app = new express();
const nodemailer = require("nodemailer")

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
        let results = 0;
        try{
        results = await query.verificarUtilizador(useremail,userpassword);
        }catch(err){
            console.log(err);
        }
        if (results.length > 0){
            let user = new utilizador(results[0].user_id, results[0].user_nome, results[0].user_email, results[0].user_privilegio);
            request.session.name = user.nome; 
            request.session.loggedin = true;
            request.session.useremail = useremail;
            request.session.userid = user.id;
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
        res.render("registar",{
            name: req.session.name});
    } else {
        res.redirect('/login');
    }
});

app.post('/registarUtilizador',async (req,res)=>{

    var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
         password += charset.charAt(Math.floor(Math.random() * n));
    }

    let email = req.body.email;
    let nome = req.body.nome

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: 'wareregy@gmail.com', 
          pass: 'integracaosistemas', 
        }
      });

    var mailOptions = {
        from: 'wareregy@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: password
      };
    let query = new queries();
    
    try{
        novoUtilizador = await query.novoUtilizador(nome,email,password);
        
        if(novoUtilizador){
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                  return console.log(error);
                }});

            res.render("registar",{
                name: req.session.name,
                msg: "Utilizador registado com sucesso",
                msgClass: 'alert-success'});     
        }
        }catch(err){
            res.render("registar",{
                name: req.session.name,
                msg: "Erro ao registar utilizador",
                msgClass: 'alert-danger'});
        }
});


app.get('/produtos', (req,res)=>{
    if (req.session.loggedin) {
        //res.sendFile(path.join(__dirname,"public","index.html"));
        res.render("produtos",{
            name: req.session.name});
    } else {
        res.redirect('/login');
    }
});

app.get('/incidencias',(req,res)=>{
    if (req.session.loggedin) {
        //res.sendFile(path.join(__dirname,"public","index.html"));
        res.render("incidencias");
}});

app.get("/carregarRegistos", async (req,res)=>
{
    let query = new queries();
    let registos = 0;
    try{
        registos = await query.consultarRegistos(req.session.userid);
        res.json(registos);
    }catch(err){
        console.log(err);
    }
})

app.get("/carregarAllRegistos", async (req,res)=>
{
    let query = new queries();
    let registos = 0;
    try{
        registos = await query.consultarAllRegistos();
     
        res.json(registos);
    }catch(err){
        console.log(err);
    }
})

app.post('/getregistos', async(req,res)=>{
    let query = new queries();
    let registos = 0;
     let semana = req.body.semana;
     let ano = req.body.ano;
    try{
        registos = await query.getRegistos(semana,ano);
        console.log(registos)
        res.json(registos);
    }catch(err){
        console.log(err);
    }
});

app.get('/incidencias',(req,res)=>{
    if (req.session.loggedin) {
        //res.sendFile(path.join(__dirname,"public","index.html"));
        res.render("incidencias",{
            name: req.session.name});
    } else {
        res.redirect('/login');
    }
});

app.get('/estatisticas',(req,res)=>{
    if (req.session.loggedin) {
        //res.sendFile(path.join(__dirname,"public","index.html"));
        res.render("estatisticas",{
            name: req.session.name});
    } else {
        res.redirect('/login');
    }
});

app.get('/eventos',(req,res)=>{
    if (req.session.loggedin) {
        //res.sendFile(path.join(__dirname,"public","index.html"));
        res.render("eventos",{
            name: req.session.name});
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
})
