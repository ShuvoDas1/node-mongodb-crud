const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const objectId = require('mongodb').ObjectId;

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

  app.get('/product/:id',(req,res)=>{
    productCollection.find({_id:objectId(req.params.id)})
    .toArray((err,documents)=>{
      res.send(documents[0]);
    })
  })
  
  app.post('/addProduct',(req,res) =>{
    const product = req.body;
      productCollection.insertOne(product)
      .then(result =>{
        console.log('product added successfully');
        res.redirect('/')
      })
  })

  app.patch('/update/:id',(req,res) =>{
    productCollection.updateOne({_id:objectId(req.params.id)},
    {
      $set: {price : req.body.price, quantity: req.body.quantity}
    })
    .then(result =>{
      res.send(result.modifiedCount > 0)
    })
  })

  app.delete('/delete/:id',(req,res) => {
      productCollection.deleteOne({_id:objectId(req.params.id)})  
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })
  
});



app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})


app.listen(3000);