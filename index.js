const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
// middle wares 
app.use(cors())
app.use(express.json());


const uri = "mongodb+srv://chakriDbUser:XKnvPw3Vw6g15d4d@cluster0.tszj1lq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {
    try {
        const freshersCollection = client.db('chakriDb').collection('freshers');
        const experiencedCollection = client.db('chakriDb').collection('experienced');
        const WCompanyCollection = client.db('chakriDb').collection('worldCompany');
        const BCompanyCollection = client.db('chakriDb').collection('bangladeshIt');

        app.get('/freshers', async (req, res) => {
            const query = {}
            const cursor = freshersCollection.find(query);
            const fresher = await cursor.toArray();
            res.send(fresher);
        });
        app.get('/experienced', async (req, res) => {
            const query = {}
            const cursor = experiencedCollection.find(query);
            const experienced = await cursor.toArray();
            res.send(experienced);
        });
        app.get('/world', async (req, res) => {
            const query = {}
            const cursor = WCompanyCollection.find(query);
            const wCompany = await cursor.toArray();
            res.send(wCompany);
        });
        app.get('/bangladesh', async (req, res) => {
            const query = {}
            const cursor = BCompanyCollection.find(query);
            const bCompany = await cursor.toArray();
            res.send(bCompany);
        });
    }
    finally {

    }
}
run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Chakri server is running');
})

app.listen(port, () => {
    console.log(`Chakri running on ${port}`);
})