const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const http = require('http');
const app = express();

// maak een nieuwe server aan en luister naar poort 4000 van de VPS (136.144.230.97)
const server = http.createServer(app).listen(4000);

const selectAll = 'SELECT * FROM accounts';

const connection = mysql.createConnection({
  host: '136.144.230.97',
  user: 'ipmedt4',
  password: 'ipmedt4_TravelBuddy',
  database: 'ipmedt4',
  multipleStatements: true,
});

connection.connect(err =>{
  if(err){
    return err;
  }
});

app.use(cors());

app.get('/', (req,res) =>{
 res.send('go to /users to see the current users')
});

app.get('/users/add', (req, res) =>{
  const {username, name, email, password, firstLogin} = req.query;
  const insertUserIntoDatabase = `INSERT INTO accounts ( username, name, email, password, firstLogin) VALUES('${username}','${name}', '${email}', md5('${password}'))`
  connection.query(insertUserIntoDatabase, (err, results) =>{
    if(err){
      return res.send(err);
    }else{
      return res.send('Succesfully added a user');
    }
  });
});

// haal de informatie van een gebruiker op
app.get('/login', (req,res) =>{
  const {username, password} = req.query;
  const getPasswordFromUser = `SELECT password FROM accounts WHERE username='${username}';`
  connection.query(getPasswordFromUser, (err,results) => {
    if(err){
      return res.send(err);
    }else{
      res.send({
        data:results
      })
    }
  })
});

//bekijk de users om het te testen
app.get('/users', (req,res) => {
  connection.query(selectAll, (err,results) =>{
    if(err){
      return res.send(err)
    } else{
      res.send({
        data: results
      })
    }
  })
});

app.get('/userinfo/update', (req,res) => {
  const {username, profilepicture} = req.query;
  const editProfilePicture = `UPDATE user_info SET profile_picture = '${profilepicture}' WHERE username = '${username}'`
  connection.query(editProfilePicture, (err,results) =>{
    if(err){
      return res.send(err)
    } else {
      res.send({
        data: results
      })
    }
  })
});

app.get('/updatefirstlogin', (req,res) =>{
  const {username} = req.query;
  const updateFirstLogin = `UPDATE accounts SET firstlogin=0 WHERE username='${username}';`
  connection.query(updateFirstLogin, (err,results) => {
    if(err){
      return res.send(err);
    }else{
      res.send({
        data: results
      });
    }
  })
});

app.get('/getfirstlogin', (req,res) =>{
  const {username} = req.query;
  const getFirstLoginFromUser = `SELECT password FROM accounts WHERE username='${username}';`
  connection.query(getFirstLoginFromUser, (err,results) => {
    if(err){
      return res.send(err);
    }else{
      res.send({
        data:results
      })
    }
  })
});
