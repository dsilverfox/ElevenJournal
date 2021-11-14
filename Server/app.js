require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

//middleware functions ?? Do all middleware functions need to occur before any routes, or just this one in particular?
app.use(require('./middleware/headers'));

const controllers = require("./controllers");

app.use(Express.json());

app.use('/user', controllers.userController);

//When app.use(require("./middleware/validate-jwt")); has routes above it then - ANYTHING BELOW THIS POINT REQUIRES PROPER AUTHENICATION. Anything above it does not. Works best if all routs need to be protected.

app.use('/journal', controllers.journalController);
//database authentication
dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, ()=> {
        console.log(`[SERVER]: App is listening on 3000.`);
    });
})
    .catch((err) => {
        console.log(`[SERVER]: Server Crashed. Error = ${err}`);
    });


//uses
app.use('/test', (req, res) => {
    res.send('This is a message from the test endpoint on the server!')
});


