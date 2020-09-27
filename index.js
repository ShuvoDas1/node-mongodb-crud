const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const password = 'bjix8DVun8Y4ADE';



const uri = "mongodb+srv://organicUser:bjix8DVun8Y4ADE@cluster0.vktpy.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });


const app = express();



client.connect(err => {
  const collection = client.db("organicdb").collection("products");
  console.log('connect database successfully');
  client.close();
});



app.get('/',(req,res) => {
    res.send('hello brother im working')
})


app.listen(3000);