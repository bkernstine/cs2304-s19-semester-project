'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); //8080
const blabs = require('./data');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//GET
app.get('/blabs', (request, response) => {
    if(!blabs){
        response.status(404).json({ message: 'No blabs found'})
    }
    response.json(blabs);
});

app.get('/blabs/:id', (request, response) => {
    
    const requestID = request.params.id;

    let blab = blabs.filter(blab => {
        return blab.id == requestID;
    })[0];

    if(!blab){
        response.status(404).json({ message: 'No blab found'})
    }

    response.json(blab[0]);
});


//POST

app.post('/blabs', (request, response) => {
    const blab = {
        id: blabs.length+1,
        posttime: new Date(),
        author:{
            email: request.body.email,
            name: request.body.name
        },
        message: request.body.message
    }

    blabs.push(blab);

    response.status(201).json(blab);

});


//DELETE
app.delete('/blabs/:id', (request, response) => {
    const requestID = request.params;

    let blab = blabs.filter(blab => {
        console.log(`${blab.id}`)
        return blab.id == requestID;
    })[0];

    if(!blab){
        response.status(404).json({ message: 'Blab not found'})
    }

    const index = blabs.indexOf(blab);

    blabs.splice(index,1);

    response.status(200).json({message: 'Blab deleted successfully' });
    




})





const hostname =  'localhost';
const port = 3000;



app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
});

