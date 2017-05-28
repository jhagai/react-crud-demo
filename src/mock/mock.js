const express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // for parsing application/json


var database = [
    {
        id: 0,
        firstName: 'Bruce',
        lastName: 'Wayne',
        job: 'Billionaire',
        ssn: null,
        birthDate: new Date(1938, 5, 1)
    },
    {
        id: 1,
        firstName: 'Clark',
        lastName: 'Kent',
        job: 'Journalist',
        ssn: null,
        birthDate: new Date(1939, 2, 30)
    },
    {
        id: 2,
        firstName: 'Alfred',
        lastName: 'Pennyworth',
        job: 'Butler',
        ssn: null,
        birthDate: new Date(1939, 2, 30)
    },
    {
        id: 3,
        firstName: 'Lois',
        lastName: 'Lane',
        job: 'Journalist',
        ssn: null,
        birthDate: new Date(1939, 2, 30)
    },
    {
        id: 4,
        firstName: 'Barry',
        lastName: 'Allen',
        job: 'Forensic scientist',
        ssn: null,
        birthDate: new Date(1956, 9, 1)
    },
    {
        id: 5,
        firstName: 'Hal',
        lastName: 'Jordan',
        job: 'Test pilot',
        ssn: null,
        birthDate: new Date(1959, 9, 22)
    },
    {
        id: 6,
        firstName: 'Diana',
        lastName: 'Diana',
        job: 'Amazon princess',
        ssn: null,
        birthDate: new Date(1987, 1, 1)
    }
];

var callNumber = 0;


app.get('/people', (req, res) => {

    if (false) {
        setTimeout(() => {
            res.header('Content-Type', 'application/json');
            res.header("Cache-Control", "no-cache, no-store, must-revalidate");
            res.header("Pragma", "no-cache");
            res.header("Expires", 0);

            res.status(500).send('Une erreur est survenue!');
        }, 500);
    } else {
        setTimeout(() => {

            var result = database;

            var firstName = req.query.firstName;
            if (firstName) {
                result = database.filter(
                    function (entry) {
                        return entry.firstName.toUpperCase().indexOf(firstName.toUpperCase()) > -1
                    }
                );
            }

            var lastName = req.query.lastName;
            if (lastName) {
                result = database.filter(
                    function (entry) {
                        return entry.lastName.toUpperCase().indexOf(lastName.toUpperCase()) > -1
                    }
                );
            }


            res.header('Content-Type', 'application/json');
            res.header("Cache-Control", "no-cache, no-store, must-revalidate");
            res.header("Pragma", "no-cache");
            res.header("Expires", 0);

            res.status(200).json(result);
        }, 500);
    }

    callNumber++;
});


app.post('/login', (req, res) => {
        setTimeout(
            () => {
                var json = req.body;

                if (json.email.startsWith('a')) {
                    res.status(500);
                } else {
                    res.status(200);
                }
                res.end();
            }, 500
        );
    }
);

app.put('/people/:id', (req, res) => {
        setTimeout(
            () => {
                var personId = parseInt(req.params.id, 10);
                var personIndex = database.findIndex((entry) => entry.id === personId);
                var json = req.body;
                database[personIndex] = json;
                res.status(200);
                res.end();
            }, 500
        );
    }
);

app.post('/people', (req, res) => {
        setTimeout(
            () => {
                var json = req.body;
                json.id = database.length;
                database.push(json);
                res.status(200).json(json);
                res.end();
            }, 500
        );
    }
);

const port = 8000;
app.listen(port, () => {
    console.log('We are live on ' + port);
});