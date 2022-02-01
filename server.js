const express = require("express");
const bodyParser = require("body-parser");
const MOngoClient = require("mongodb").MongoClient;
const { sendFile } = require("express/lib/response");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const connectionString =
  "mongodb+srv://sharukhnew:sharukh111@cluster0.1gpzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MOngoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("connected to database server");
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");

    //1Create with POST
    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => console.error(error));
    });

    //2.Reading data from MongoDB
    app.get("/getall", (req, res) => {
      db.collection("quotes")
        .find()
        .toArray()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => console.error(error));
    });

    //3.Updating the data
    app.put("/updatequote", (req, res) => {
      quotesCollection
        .findOneAndUpdate()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => console.error(error));
    });
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
