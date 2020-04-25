var http = require('http');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://thoang05:kykL6bVTFofIQhFC@cluster0-e3vaj.mongodb.net/test?retryWrites=true&w=majority";

http.createServer(function(req,res) {

  res.writeHead(200, {'Content-Type': 'text/html'});
  var obj = url.parse(req.url, true).query;
  var info = obj.name
  
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true},function(err, db) {
    if (err) {
      console.log(err);
      return;
    } 

  var database = db.db("Companies");
  database.collection("companies").findOne({ $or: [{Company: info}, {Ticker: info}]}, (err, result) => {
    
    if (result == null) {
       res.write("Company Name or Stock Ticker was not found.");
       return;
    }

    companyname = result.Company;
    companyticker = result.Ticker;
    res.write("<span style='font-size: 2em'>" + "Company Name: " + companyname + "<br>" + "Company Ticker: " + companyticker + "<br><br>" + "Click " + "<a href = https://thoang05.github.io/company/form.html>" + "here" + "</a>" + " to go back to the form" + "</span>");


     db.close();
   })
  });

}).listen(process.env.PORT || 3000);