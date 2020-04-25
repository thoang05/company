var http = require('http');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;

/* Connecting MongoDB to NodeJS */
const uri = "mongodb+srv://thoang05:kykL6bVTFofIQhFC@cluster0-e3vaj.mongodb.net/test?retryWrites=true&w=majority";

http.createServer(function(req,res) {

  res.writeHead(200, {'Content-Type': 'text/html'});
  // Take in the query from user's input
  var obj = url.parse(req.url, true).query;
  var info = obj.name
  
  // Getting into the correct database and collection
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true},function(err, db) {
    if (err) {
      console.log(err);
      return;
    } 

  var database = db.db("Companies");

  // Checking if user's input matches any document in the collection and display results
  database.collection("companies").findOne({ $or: [{Company: info}, {Ticker: info}]}, (err, result) => {

    if (result == null) {
       res.write("<span style='font-size: 2em'>" + "Company Name or Stock Ticker was not found." + "<br><br>" + "Click " + "<a href = https://thoang05.github.io/company/form.html>" + "here" + "</a>" + " to go back to the form" + "</span");
       return;
    }

    companyname = result.Company;
    companyticker = result.Ticker;
    res.write("<span style='font-size: 2em'>" + "Company Name: " + companyname + "<br>" + "Company Ticker: " + companyticker + "<br><br>" + "Click " + "<a href = https://thoang05.github.io/company/form.html>" + "here" + "</a>" + " to go back to the form" + "</span>");
     db.close();

    })
  });
}).listen(process.env.PORT || 3000);