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
    /* If result is null (not in database) tell the user that and return */
    if (result == null) {
       res.write("Company Name or Stock Ticker was not found.");
       return;
    }
    /* Otherwise, set the company name to the result and display it to the user */
    companyname = result.Company;
    companyticker = result.Ticker;
     res.write("<span style='font-size: 2em'>" + "Company Name: " + companyname + "<br>" + "Company Ticker: " + companyticker + "</span><br>");
     res.write("Click" + "<a href=thoang05.github.io/company/form.html>" + "here" + "</a>" + " to go back to the form")

     /* Close the database */
     db.close();
   })
  });

}).listen(process.env.PORT || 3000);