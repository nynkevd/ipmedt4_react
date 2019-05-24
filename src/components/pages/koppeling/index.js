const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const selectAll = 'SELECT * FROM user_test';

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
  const {name, email, password} = req.query;
  const insertUser = `INSERT INTO user_test (name, email, password) VALUES('${name}', '${email}', '${password}')`
  connection.query(insertUser, (err, results) =>{
    if(err){
      return res.send(err);
    }else{
      return res.send('Succesfully added a user');
    }
  });
});

app.get('/users', (req,res) => {
  connection.query(selectAll, (err,results) =>{
    if(err){
      return res.send(err)
    } else{
      res.json({
        data: results
      })
    }
  })
})

app.listen(4000, () =>{
  console.log('Listening');
})
