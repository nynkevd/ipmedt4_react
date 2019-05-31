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
  database: 'ipmedt4'
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
  const {username, name, email, password} = req.query;
  const insertUser = `INSERT INTO accounts ( username, name, email, password) VALUES('${username}','${name}', '${email}', md5('${password}'))`
  connection.query(insertUser, (err, results) =>{
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
  const getInfo = `SELECT password FROM accounts WHERE username ='${username}'`
  connection.query(getInfo, (err,results) =>{
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
