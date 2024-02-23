const express = require('express');
const cors = require('cors');
const app = express();
const vercelURL = process.env.VERCEL_URL || 3003;

app.use(cors({
    methods: ['GET', 'POST'], 
  }));

app.use(express.json());

let tickets = [];

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get("/tickets", (req, res) => {
    res.send(tickets);
})

app.post('/tickets', (req, res) => {
    tickets.push(req.body);
    res.send(tickets);

    console.log(req.body);
})

app.listen(vercelURL, () => {
    console.log('Servidor iniciado na porta', vercelURL);
});