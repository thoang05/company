var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://thoang05:kykL6bVTFofIQhFC@cluster0-e3vaj.mongodb.net/test?retryWrites=true&w=majority";

fs.readFile('companies.csv', 'utf8', function (err, data) {
  if (err) {
    console.log(err);
    return;
  }

  var lines = data.split('\n');

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true},function(error, db) {
    if (error) {
      console.log(error);
      return;
    }

    var company = db.db("Companies");

    var single_line;
    for (i = 1; i < lines.length; i++) {
      single_line = lines[i].split('\r');
      single_line = single_line[0].split(',');
      if (single_line.length == 2) {
        company_info = single_line[0];
        ticker_info = single_line[1];
        var newDocument = {"Company": company_info, "Ticker": ticker_info};
        console.log(newDocument);
        company.collection("companies").insertOne(newDocument, function(err, res) {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  });
});
