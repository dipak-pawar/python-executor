var express = require('express'),
  bodyParser = require('body-parser')
  app = express(),
  port = process.env.PORT || 3000,

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port);

console.log('Python Executor API server started on: ' + port);

app.get('/statusz', (request, response) => response.send('I am ready'));


// Create new Alert
app.post('/alert', function (req, res) {
    // console.log(req.body)
    
    var spawn = require("child_process").spawn;
     
    // Parameters passed in spawn -
    // 1. type_of_script
    // 2. list containing Path of the script
    //    and arguments for the script 
     
    // e.g. : http://localhost:3000/alerts
    var scriptExecution = spawn('python',["./../scripts/hello.py",
                            JSON.stringify(req.body)] );

 
    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    scriptExecution.stdout.on('data', function(data) {
        res.status(200).send(data)
    } )

    // Handle error output
    scriptExecution.stderr.on('data', (data) => {
        console.log(data);
        res.status(500).send(data);
    });
});

