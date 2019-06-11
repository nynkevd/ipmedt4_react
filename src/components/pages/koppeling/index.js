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
  const insertUserIntoDatabase = `INSERT INTO accounts ( username, name, email, password, firstLogin) VALUES('${username}','${name}', '${email}', md5('${password}'), '1')`
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
// verander de waarden van de profielfoto, de van en de naar (reistraject)
app.get('/userinfo/update', (req,res) => {
  const {username, profile_picture, travelFrom, travelTo} = req.query;
  const editProfilePicture = `UPDATE user_info SET profile_picture = '${profile_picture}' WHERE username = '${username}';
                              UPDATE user_info SET travelTo = '${travelTo}' WHERE username = '${username}';
                              UPDATE user_info SET travelFrom = '${travelFrom}' WHERE username = '${username}';`
  connection.query(editProfilePicture, (err,results) =>{
    if(err){
      return res.send(err)
    } else {
      res.send("Succesfully updated")
    }
  })
});
// Vraag de waarde van het reistraject op
app.get('/travelinfo', (req,res) => {
  const {username} = req.query;
  const getTravelInfo = `SELECT * FROM user_info WHERE username = '${username}'`
  connection.query(getTravelInfo, (err,results) =>{
    if(err){
      return res.send(err)
    } else {
      res.send({
        data:results
      })
    }
  })
});
// Verander de waarde van de firstlogin naar 0
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
// Vraag de waarde van de firstlogin op
app.get('/getfirstlogin', (req,res) =>{
  const {username} = req.query;
  const getFirstLoginFromUser = `SELECT firstlogin FROM accounts WHERE username='${username}';`
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

// Voeg interesses toe aan de ingelogde gebruiker
app.get('/user_interests/add', (req, res) =>{
  const {username,interest} = req.query;
  const insertUserInterestsIntoDatabase = `INSERT INTO user_interests ( user, interest ) VALUES('${username}','${interest}')`
  connection.query(insertUserInterestsIntoDatabase, (err, results) =>{
    if(err){
      return res.send(err);
    }else{
      return res.send('Succesfully added an interest');
    }
  });
});
//voeg een gebruiker aan de de user_info tabel toe
app.get('/user_info/add', (req, res) =>{
  const {username,profile_picture, travelFrom, travelTo, age } = req.query;
  const insertUserInfoIntoDatabase = `INSERT INTO user_info ( username, profile_picture, travelFrom, travelTo, age  ) VALUES('${username}','${profile_picture}','${travelFrom}','${travelFrom}', '${age}' )`
  connection.query(insertUserInfoIntoDatabase, (err, results) =>{
    if(err){
      return res.send(err);
    }else{
      return res.send('Succesfully added an user to user_info');
    }
  });
});
