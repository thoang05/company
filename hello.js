var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;




http.createServer(function(req,res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var obj = url.parse(req.url, true).query;
  var name = obj.company;
  var ticker = obj.ticker;

  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://thoang05:mongodatabase@cluster0-e3vaj.mongodb.net/test?retryWrites=true&w=majority";
  // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true},function(err, db) {
    if (err) {
      console.log(err);
      return;
    } 

  var database = db.db("Companies");
  database.collection("companies").findOne({ $or: [{Company: name}, {Ticker: ticker}]} , (err, result) => {
    /* If result is null (not in database) tell the user that and return */
    if (result == null) {
       res.write("Company Name or Stock Ticker was not found.");
       return;
    }
    /* Otherwise, set the company name to the result and display it to the user */
     companyname = result.Company;
     ticker = result.Ticker;
     res.write("Company Name: " + companyname + "\n" + "Company Ticker: " + ticker);
     /* Close the database */
     db.close();
   })
  });

  res.write("<h2>Hello World</h2>");
  res.write("Success! This app is deployed online");
  res.write("Company is:" + name);
  res.end();
}).listen(port);