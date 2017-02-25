var express = require('express');
var fs = require('fs-sync');
var app = express();
//Server web page.
app.use(express.static('static'));
app.listen(3001, function () {
  console.log('RTSC is now loaded.');
});
