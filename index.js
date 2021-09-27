const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const pg = require('pg')
const ServicesFactory = require("./servicesFactory");
const flash = require('express-flash');
const session = require('express-session');
const app = express();
const Pool = pg.Pool;
var useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// const bootstrap = require('bootstrap')
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/regdb';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

var servicesFactory = ServicesFactory(pool);

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ partialsDir: "./views/partials", viewPath: './views', layoutsDir: './views/layouts' }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(flash());
const PORT = process.env.PORT || 3012;

var nameInput;

app.get("/",async (req, res) => {
    let input  = req.body.nameInput
    res.render("index",{out: await servicesFactory.allTowns(),
        errorOut:servicesFactory.errorOut(req.body.nameInput),
        successOut:servicesFactory.successOut(req.body.nameInput)
    })
})
app.get("/reg_numbers", (req, res) => {

})
app.post("/show",async (req,res)=>{
    res.render("index",{out:await servicesFactory.getCAWY(req.body.rgBtn)})
})

app.post("/showAll",async (req,res)=>{
    res.render("index",{
        out:await servicesFactory.allTowns()
    })  
})

app.post("/", async (req, res) => {
    console.log(req.body.rgBtn);
    await servicesFactory.add(req.body.nameInput)
    res.render("index",{
       out: await servicesFactory.allTowns(),
       errorOut:servicesFactory.errorOut(req.body.nameInput),
       successOut:servicesFactory.successOut(req.body.nameInput)
       
    })
    // res.redirect("/");

})
app.post("/reset", async (req, res) => {
    await servicesFactory.reset()
    res.redirect("/")

})

app.listen(PORT, () => {
    console.log("Listening at PORT: " + PORT);
})