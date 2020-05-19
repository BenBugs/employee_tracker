

// The util module is for 'internal APIs. 

// Require npm module
const util = require('util');

// Store promisified fs.writeFile in variable. fs.writeFile is an async func. It will keep trying to write the file.
const writeFileAsync = util.promisify(fs.writeFile);

// Store API route in variable
const file = __dirname + `/db/db.json`;

// example route.
app.post('/api/end_point', function (req, res) {

let request_body = req.body; // input note as object
let request_body_stringified = JSON.stringify(request_body); //stingifies the response object so it can be written


// multi-line func.
writeFileAsync(file, request_body_stringified)
.then(response => { 
    res.send(request_body_stringified) 
})
.catch(err => { 
    console.log(err) 
});


// single line func.
writeFileAsync(file, data).then(response => { res.send(data) }).catch(err => { console.log(err) });

});

