/* Import Modules */
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userParser = require('./middlewares/user-parser');


/* Import Routers */
const indexRouter = require('./routes/index.js');
const userRouter = require('./routes/user.js');
const loginRouter = require('./routes/login.js');
const authRouter = require('./routes/auth/auth.js');

/* Constant Variables */
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/capslock";


/* Server Setup */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(express.static('public'));
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(userParser);


/* DataBase */
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => {console.log('Mongoose is connected');});




/* Middlewares */
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/auth', authRouter);


/* Server Listening */
app.listen(PORT, '0.0.0.0', () => {
    process.stdout.write('\033[2J');
    console.clear();
    console.log(`Listening at port ${PORT}...`);
});



