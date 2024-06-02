const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruhnsqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // await client.connect();

        const TeacherCollection = client.db("StudentLogInDB").collection("OurTeacher");
        const ResultCollection = client.db("StudentLogInDB").collection("StudentResult");

        // mongoDB to server
        app.get('/OurTeacher', async (req, res) => {
            const result = await TeacherCollection.find().toArray();
            res.send(result);
        })


        // mongoDB to server
        app.get('/StudentResult', async (req, res) => {
            const result = await ResultCollection.find().toArray();
            res.send(result);
        })

        app.post('/StudentResult', async (req, res) => {
            const AddResults = req.body;
            console.log(AddResults);
            const result = await ResultCollection.insertOne(AddResults);
            res.send(result);

        })









        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('student server running')
})

app.listen(port,()=>{
    console.log(`Server running on port${port}`);
})