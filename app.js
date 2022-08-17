const express = require('express')
const passport = require('passport')
const dotenv = require('dotenv');
const path = require('path')
const exphbs = require('express-handlebars');
const session = require('express-session') // 
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

const app = express()

require('./config/passport')(passport)

connectDB();

// Body parser
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override

// Handlebars Helpers

// Handlebars
// Add the word .engine after exphbs
app.engine('hbs', exphbs.engine({
  layoutsDir: __dirname + '/views/layouts',
  defaultLayout: 'main',
  extname: 'hbs',
})
);
app.set('view engine', 'hbs');

app.set('views', __dirname + '/views');

// Sessions
// WHAT IS THIS
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global var

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes

app.use('/', require('./routes/index'))
app.use('/login', require('./routes/login'));



const PORT = 3000 || process.env.PORT

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);