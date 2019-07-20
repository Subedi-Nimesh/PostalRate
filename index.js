const express = require('express')
const path = require('path')
const parser = require('body-parser')
const PORT = process.env.PORT || 8888


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('public/calculate.html'))
  .get('/calculate', (req, res) => {
    let weight = parseInt(req.query.weight);
    let mailType = req.query.mailType;
    let cost = totalCost(weight, mailType);
    res.render('pages/display.ejs', {weight: weight, mailType: mailType, cost: cost});
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function totalCost(weight, mailType) {
    if (mailType == 'stamped')
    {
      switch (true) {
        case (weight <= 1):
          return .55;
        case (weight <= 2):
          return .70;
        case (weight <= 3):
          return .85;
        case (weight <= 3.5):
          return 1;
      
        default:
          break;
      }
    }
    if (mailType == 'metered')
    {
      switch (true) {
        case (weight <= 1):
          return .50;
        case (weight <= 2):
          return .65;
        case (weight <= 3):
          return .80;
        case (weight <= 3.5):
          return .95;
      
        default:
          break;
      }
    }
    if (mailType == 'flats')
    {
      switch(true) {
        case (weight <= 1):
          return 1;
        case (weight <= 2):
          return 1.15;
        case (weight <= 3):
          return 1.30;
        case (weight <= 4):
          return 1.45;
        case (weight <= 5):
          return 1.60;
        case (weight <= 6):
          return 1.75;
        case (weight <= 7):
          return 1.90;
        case (weight <= 8):
          return 2.05;
        case (weight <= 9):
          return 2.20;
        case (weight <= 10):
          return 2.35;
        case (weight <= 11):
          return 2.50;
        case (weight <= 12):
          return 2.65;
        case (weight <= 13):
          return 2.80;
        default:
          break;
      }
    }
    if (mailType == 'retail')
    {
      switch(true) {
        case (weight <= 4):
          return 3.66;
        case (weight <= 8):
          return 4.39;
        case (weight <= 12):
          return 5.19;
        case (weight >= 13):
          return 5.71;
        default:
          break;
      }
    }
  }