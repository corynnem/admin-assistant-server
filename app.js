require('dotenv').config()
var express = require('express');
var app = express();
var user = require("./controllers/usercontroller")
var sequelize = require('./db');


sequelize.sync({force: true});
// sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));
app.use('/user', user)


app.listen(process.env.PORT, function(){
    console.log(`App listening on ${process.env.PORT}`)
})


