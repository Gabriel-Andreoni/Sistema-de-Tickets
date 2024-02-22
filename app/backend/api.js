const express = require('express');
const cors = require('cors');
const app = express();
const port = 3003;
app.use(cors());
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

app.listen(port, () => {
    console.log('Servidor iniciado na porta', port);
});