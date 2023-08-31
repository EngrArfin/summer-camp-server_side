const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

console.log(process.env.USER_PASS);


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.xu7sm0d.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
  
/*     const serviceCollection = client.db('toyMarket').collection('services');
    const bookingCollection = client.db('toyMarket').collection('toying');
    const categoriesCollection = client.db('CourseLBD').collection('categories'); */


    /*  app.get('/services', async(req, res) =>{
      const cursor = serviceCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    
    app.get('/services/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new Object(id)}

      const options = {
        projection: { title: 1, price: 1, service_id: 1, img: 1},
      }; 

      const result = await serviceCollection.findOne(query, options);
      res.send(result);

    })
 */

    const courseCollection = client.db('CourseLBD').collection('courses');
    const teachersCollection = client.db('CourseLBD').collection('teachers');
    const categoriesCollection = client.db('CourseLBD').collection('categories');
    //courses
    app.get('/courses', async(req, res) =>{
      const result = await courseCollection.find().toArray();
      res.send(result);
    })
    app.post('/courses', async(req, res) =>{
      const courses = req.body;
      console.log(courses);
      const result = await courseCollection.insertOne(courses);
      res.send(result)

    })

    /* teachers */
    app.get('/teachers', async(req, res) =>{
      const result = await teachersCollection.find().toArray();
      res.send(result);
    })
    app.post('/teachers', async(req, res) =>{
      const teachers = req.body;
      console.log(teachers);
      const result = await teachersCollection.insertOne(teachers);
      res.send(result)

    })

    /* categories */
    app.get('/categories', async(req, res) =>{
      const result = await categoriesCollection.find().toArray();
      res.send(result);
    })
    app.post('/categories', async(req, res) =>{
      const categories = req.body;
      console.log(categories);
      const result = await categoriesCollection.insertOne(categories);
      res.send(result)

    })

   


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send(' Welcome Server Summer Camp')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})