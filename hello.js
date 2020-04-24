var http = require('http');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var port = process.env.PORT || 3000;


const uri = "mongodb+srv://thoang05:mongodatabase@cluster0-e3vaj.mongodb.net/test?retryWrites=true&w=majority";


http.createServer(function(req,res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var obj = url.parse(req.url, true);
  var info = obj.query.name
  

  

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true},function(err, db) {
    if (err) {
      console.log(err);
      return;
    } 

  var database = db.db("Companies");
  database.collection("companies").findOne({ $or: [{Company: info}, {Ticker: info}]}, (err, result) => {
    /* If result is null (not in database) tell the user that and return */
    if (result == null) {
       res.write("Company Name or Stock Ticker was not found.");
       return;
    }
    /* Otherwise, set the company name to the result and display it to the user */
    var companyname = result.Company;
    var companyticker = result.Ticker;
     res.write("Company Name: " + companyname + "\n" + "Company Ticker: " + companyticker);
     /* Close the database */
     db.close();
   })
  });

  // res.write("<h2>Hello</h2>");
  // res.write("Success! This app is deployed online");
  // res.end();
}).listen(port);