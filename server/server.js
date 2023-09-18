import 'dotenv/config';
import express         from 'express';
import cors            from 'cors';
import mongoose from 'mongoose';
import { create, deposit, withdraw, transfer, find, all } from './dal.js';
// import { UserContext } from './src/context.js';
// import { useContext } from 'react';

// const ctx = useContext(UserContext);
const app     = express();

// used to serve static files from public directory when developing
app.use(express.static('public'));

app.use(cors());

//accounting for environment variables https://adostes.medium.com/using-environment-variables-in-a-react-application-ac3b6c307373
const { NODE_ENV } = process.env;
const API_URL =
     NODE_ENV === 'production' ? window.API_URL : process.env.REACT_APP_API_URL;
// const buildFolder = './src';
// app.set('views', path.join(__dirname, buildFolder));
// app.engine('html', require('ejs').renderFile);

// create user account
app.get('/api/account/create/:id/:name/:email/:password', function (req, res){
     // check if account exists
     find(req.params.email)
     .then((users) => {

         // if user exists, return error message
         if(users.length > 0){
             console.log('User already exists');
             res.send('User already exists');    
         }
         else{
             // else create user
             create(req.params.id,req.params.name,req.params.email,req.params.password).
                 then((user) => {
                     console.log(user);
                     res.send(user);            
                 })
                 .catch((err) => {
                     console.error(err);
                 })            
         }

     });
});

// return all accounts
app.get('/api/account/all', function (req, res){
    all().
    then((docs) => {
        console.log(docs);
        res.send(docs);
})
.catch((err) =>{
    console.error(err);
});
});

// find user account
app.get('/api/account/find/:uid', function (req, res) {

    find(req.params.uid).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// app.get('/api/account/transfer/:senderBalance/:senderID/:receiverBalance/:receiverID/:amount', function (req, res) {
//     var senderBalance = Number(req.params.senderBalance);
//     var receiverBalance = Number(req.params.receiverBalance);
//     transfer(req.params.senderBalance, req.params.senderID, req.params.receiverBalance, req.params.receiverID, req.params.amount)
//        .then((data) => {
//         res.send(data);
//       })
//       .catch((err) => {
//         console.error(err);
//       })
// })

app.get('/api/account/deposit/:balance/:amount/:id', function (req, res) {

    var amount = Number(req.params.amount);
    var balance = Number(req.params.balance);

    deposit(balance, amount, req.params.id).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

app.get('/api/account/withdraw/:email/:amount/:id', function (req, res) {

    var amount = Number(req.params.amount);

    withdraw(req.params.email, amount, req.params.id).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// All other GET requests not handled before will return our React app
app.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    res.render('index.html', {API_URL});
  });

// Connect to MongoDB Atlas
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@bad-bank-final.1aca9re.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to Mongo DB Atlas');
    const port = process.env.PORT || 3001;
    //will run on port 3001 unless there is a preconfigured port
    app.listen(port);
    console.log('Listening on port: ' + port);
  })
  .catch((error) => {
    console.log(error)
  });



