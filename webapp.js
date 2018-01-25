/* jshint node: true */
"use strict";
var express = require("express");
var logger = require("morgan");
var app = express();
var template = require("pug").compileFile('./templates/default.pug');

app.use(logger("dev"));
app.use(express.static('./static'));

app.get("/", function(req, res) {
	try {
		var html = template({title: 'CryptoCurrency Info'});
		res.send(html);
	} catch(e) {
		next(e);
	}
});

var server = app.listen(8080, function() {
	console.log("Listening on port %s...", server.address().port);
});