const Express = require('express');
const app = Express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const {Sequelize} = require('sequelize');

const {port} = require('./config');
const PORT = process.env.PORT || port;

//Losts setup: create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'));
app.use(morgan('combined', {stream: accessLogStream}));

//cors Setup
app.use(cors());
app.use(Express.json());

//setup sql lite db connection
const sequelize = new Sequelize({dialect: 'sqlite', storage: './storage/data.db'})

//import models
const UserModel = require('./common/models/User');

//Initalising the model on seq
UserModel.initialise(sequelize);

// Express Routes Import
const UserRoutes  =require('./users/routes')

// Syncing the models that are defined on sequelize with the tables that already
// exists in the database. It creates models as tables that do not exists in
// the db.
sequelize
    .sync()
    .then(() => {
        console.log('Sequelize Initialised!!');
        app.get('/status', (request, response) => {
            const status = {
                'Status': 'Running'
            }
            response.send(status);
        })
        app.use('/user', UserRoutes);
        app.listen(PORT, () => {
            console.log(`Server Listening on PORT:${port}`);
        })
    })
    .catch((err) => {
        console.error(`Sequelize Initialisation threw an error: ${err}`);
    });