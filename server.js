projectData = {};

const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)})

    app.get('/all', (request, responce)=>{
        responce.send(projectData)
    })


    app.post('/add', (req, res)=>{
        console.log(`received data: ${req.body.date}`);

            projectData.date = req.body.date;
            projectData.temp = req.body.temp;
            projectData.feel = req.body.feel;

         console.log(projectData);
            
    })
