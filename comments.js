// Create web server
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

// Create connection to database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'comments'
});

// Connect to database
connection.connect();

// Get all comments from database
router.get('/', function (req, res) {
    connection.query('SELECT * FROM comment', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

// Add a new comment to the database
router.post('/', jsonParser, function (req, res) {
    connection.query('INSERT INTO comment (comment, author) VALUES (?, ?)', [req.body.comment, req.body.author], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

// Delete a comment from the database
router.delete('/:id', function (req, res) {
    connection.query('DELETE FROM comment WHERE id = ?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

// Update a comment in the database
router.put('/:id', jsonParser, function (req, res) {
    connection.query('UPDATE comment SET comment = ?, author = ? WHERE id = ?', [req.body.comment, req.body.author, req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

// Export router
module.exports = router;