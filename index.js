const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const password = 'bjix8DVun8Y4ADE';



const uri = "mongodb+srv://organicUser:bjix8DVun8Y4ADE@cluster0.vktpy.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });


const app = express();



client.connect(err => {
  const productCollection = client.db("organicdb").collection("products");
  
  app.post('/addProduct',(req,res) =>{
      productCollection.insertOne()
      .then(result =>{
          
      })
  })
  
});



app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})


app.listen(3000);