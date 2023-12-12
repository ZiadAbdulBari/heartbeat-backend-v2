
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const userauth = require('./routers/client/userauth.router');
const profile = require('./routers/client/profile.router');
const appointment = require('./routers/client/appointment.router');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// api
app.use('/api/user', userauth);
app.use('/api/user/profile', profile);
app.use('/api/doctor/appointment', appointment);
//404 page
app.use(function(req, res, next){
    res.status(404);
    // respond with html page
    if (req.accepts('html')) {
      res.render('pages/404', { url: req.url });
      return;
    }
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
});

//database connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Database Connected");
}).catch(error=>{
    console.log(error);
    process.exit(1);
});

//server connection
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log('Server Connected at port',PORT);
})