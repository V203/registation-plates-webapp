const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const pg = require('pg')
const ServicesFactory = require("./servicesFactory");
const Errsucc =require("./errsucc");
const flash = require('express-flash');
const session = require('express-session');
const app = express();
const Pool = pg.Pool;
// const routes = require("./Routes")
var useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/regdb';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

var servicesFactory = ServicesFactory(pool);
// var errsucc = Errsucc()
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ partialsDir: "./views/partials", viewPath: './views', layoutsDir: './views/layouts' }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(flash());
const PORT = process.env.PORT || 3017;
const { Routes } = require("./Routes");
const routes = Routes(servicesFactory);

app.get("/",routes.home)

app.post("/show",routes.show)

app.post("/showAll",routes.showAll)

app.post("/",routes.add)
    
app.post("/reset",routes.reset)

app.listen(PORT, () => {
    console.log("Listening at PORT: " + PORT);
})