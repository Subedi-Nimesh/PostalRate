const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8888
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/millionaire'
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/getQuestion', (req, res) => {
    pool.query("SELECT * FROM questions", function(error, data){
      console.log("Error" + error);
      console.log(data);
      res.json({result:data.rows})
    })
  })
  .get('/getAnswers', (req, res) => {
    pool.query("SELECT * FROM answers", function(error, data){
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
