const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const password = 'bjix8DVun8Y4ADE';



const uri = "mongodb+srv://organicUser:bjix8DVun8Y4ADE@cluster0.vktpy.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



client.connect(err => {
  const productCollection = client.db("organicdb").collection("products");

  app.get('/product',(req,res) =>{
       productCollection.find({})
      .toArray((err,documents) =>{
          res.send(documents);
      })
      
  })
  
  app.post('/addProduct',(req,res) =>{
    const product = req.body;
      productCollection.insertOne(product)
      .then(result =>{
        console.log('prodcut added successfully');
        res.send('success')
      })
  })
  
});



app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})


app.listen(3000);