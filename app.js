const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const drumItems = [
    {
        id: 1,
        value: "iPhone",
    },
    {
        id: 2,
        value: "iPhone",
    },
    {
        id: 3,
        value: "iPhone",
    },
    {
        id: 4,
        value: "iPhone",
    },
    {
        id: 5,
        value: "iPhone",
    },
    {
        id: 6,
        value: "iPhone",
    },
    {
        id: 7,
        value: "iPhone",
    },
    {
        id: 8,
        value: "iPhone",
    },
    {
        id: 9,
        value: "iPhone",
    },
    {
        id: 10,
        value: "iPhone",
    },
    {
        id: 11,
        value: "iPhone",
    },
    {
        id: 12,
        value: "iPhone",
    },
];

app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static('./'));
app.get('/api/drumItems', (req, res) => {
    res.json(drumItems);
})

app.post('/spin', (req, res) => {
    res.json(drumItems);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
