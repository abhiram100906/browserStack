const express = require('express');
const app = express();
const router = express.Router();
const browserApp = require('./browser')

app.get('/', (req,res) => {
 
  res.send("Hello");
});

router.get('/start', (req,res) => {
    const browser =  req.query.browser !== undefined ?  req.query.browser : "";
    const url =  req.query.url !== undefined ?  req.query.url : "";
    browserApp.open(browser,url);
    res.send('Start the browser');
  });
  
  router.get('/stop', (req,res) => {
    const browser =  req.query.browser !== undefined ?  req.query.browser : "";
    browserApp.stop(browser); 
    res.send('Stop the browser');
  });
  
  router.get('/cleanup', (req,res) => {
    res.send('Clean up all browser data');
  });
  
  router.get('/geturl', (req,res) => {
    res.send('Get current url');
  });
  

  app.use('/', router);

app.listen(process.env.port || 3000);
console.log('Web Server is listening at port '+ (process.env.port || 3000));