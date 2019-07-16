const express = require('express')
const path = require('path')
const parser = require('body-parser')
const PORT = process.env.PORT || 8888
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/millionaire'
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(parser.json())
  .use(parser.urlencoded({extended:true}))
  .get('/getOneQuestion', (req, res) => {
    pool.query("SELECT * FROM questions Q INNER JOIN answers A ON Q.answers_id=A.id ORDER BY RANDOM() LIMIT 1", function(error, data){
      console.log("Error" + error);
      console.log(data);
      res.json({result:data.rows})
    })
  })
  .get('/getQuestion', (req, res) => {
    pool.query("SELECT * FROM questions", function(error, data){
      console.log("Error" + error);
      console.log(data);
      res.json({result:data.rows})
    })
  })
  .post('/getAnswers', (req, res) => {
    pool.query("SELECT * FROM answers Where answer_type=$1 AND id!=$2 ORDER BY RANDOM() LIMIT 3",[req.body.answer_type, req.body.answer_id], function(error, data){
      console.log("Error" + error);
      res.json({result:data.rows})
    })
  })
  // .get('/sendAnswers', (req, res) => {
  //   pool.query("INSERT INTO answers", function(error, data){
  //     console.log("Error" + error);
  //     res.json({result:data.rows})
  //   })
  // })
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
