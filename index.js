// Import the ExpressJS package
const express = require('express');
// Create an instance of Express
const app = express();
// Set up any data needed to give to the server later
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

// Keep code D.R.Y when possible. 
// Different routes can use the same function!
function messageWithVerb(request, response) {
    response.send(`Received a request with the ${request.method} HTTP verb!`);
}
app.get('/', (request, response) => messageWithVerb(request, response));
app.post('/', (request, response) => messageWithVerb(request, response));
app.put('/', (request, response) => messageWithVerb(request, response));
app.patch('/', (request, response) => messageWithVerb(request, response));
app.delete('/', (request, response) => messageWithVerb(request, response));

// Example route for sending HTML elements as a response.
app.get('/html', (request, response) => {
    let page = `
    <h1>Test Homepage</h1>
    <p>Some text content.</p>
    <h2>It is currently ${new Date().toLocaleString('default', {weekday:'long'})}</h2>
    `
    response.send(page);
});

// Example route for sending JSON data as a response.
app.get('/json', (request, response) => {
    let someObject = {
        name: "Bye",
        isCool: true
    }
    response.json(someObject);
});


// POST route on localhost:5000/mirror
// Use Postman to test response
app.post('/mirror', (request, response) => {
    // Any submitted JSON keys will be on "body"
    // Access them with object syntax:
    let message = request.body.message;

    // Something fun to show that we can work with
    // the submitted JSON data:
    message = message.split("").reverse().join("");

    // Send back a response to the client:
    response.json({
        egassem: message
    });
});

// ED CHALLENGE
// Add a number
app.get('/calculator/:numone/add/:numtwo', (request, response) => {
    let numone = parseFloat(request.params.numone); // Convert to a float this will ensure that it is treated as a number
    let numtwo = parseFloat(request.params.numtwo); // Convert to a float this will ensure that it is treated as a number

    // Will check if both are a number if not return an error
    if (isNaN(numone) || isNaN(numtwo)) {
        response.json({
            "error": "Both values need to be numbers"
        });
    } else {
        let operation = `${numone} + ${numtwo}`;
        let result = numone + numtwo;

        // Will show the operation performed and the result in JSON
        response.json({
            "operation": operation,
            "result": result
        });
    }
});

// Subtract numbers
app.get('/calculator/:numone/subtract/:numtwo', (request, response) => {
    let numone = parseFloat(request.params.numone); // Convert to a float this will ensure that it is treated as a number
    let numtwo = parseFloat(request.params.numtwo); // Convert to a float this will ensure that it is treated as a number

    // Will check if both are a number if not return an error
    if (isNaN(numone) || isNaN(numtwo)) {
        response.json({
            "error": "Both values need to be numbers"
        });
    } else {
        let operation = `${numone} - ${numtwo}`;
        let result = numone - numtwo;

        // Will show the operation performed and the result in JSON
        response.json({
            "operation": operation,
            "result": result
        });
    }
});

// Multiply Number
app.get('/calculator/:numone/multiply/:numtwo', (request, response) => {
    let numone = parseFloat(request.params.numone); // Convert to a float this will ensure that it is treated as a number
    let numtwo = parseFloat(request.params.numtwo); // Convert to a float this will ensure that it is treated as a number

    // Will check if both are a number if not return an error
    if (isNaN(numone) || isNaN(numtwo)) {
        response.json({
            "error": "Both values need to be numbers"
        });
    } else {
        let operation = `${numone} * ${numtwo}`;
        let result = numone * numtwo;

        // Will show the operation performed and the result in JSON
        response.json({
            "operation": operation,
            "result": result
        });
    }
});

// Divide Number
app.get('/calculator/:numone/divide/:numtwo', (request, response) => {
    let numone = parseFloat(request.params.numone); // Convert to a float this will ensure that it is treated as a number
    let numtwo = parseFloat(request.params.numtwo); // Convert to a float this will ensure that it is treated as a number

    // Will check if both are a number if not return an error
    if (isNaN(numone) || isNaN(numtwo)) {
        response.json({
            "error": "Both values need to be numbers"
        });
    } else {
        let operation = `${numone} / ${numtwo}`;
        let result = numone / numtwo;

        // Will show the operation performed and the result in JSON
        response.json({
            "operation": operation,
            "result": result
        });
    }
});

// Once the server has been configured, tell it to start listening to web traffic.
app.listen(PORT, HOST, () => {
    // This logged message will appear in the terminal, not the browser.
    console.log(`Example app listening on port ${PORT}`);
});