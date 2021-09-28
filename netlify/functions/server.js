'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
let courses = require("../../models/courses.model.js");

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<h1>Hello from ${courses[0].title}!</h1>`);
  res.end();
});
router.get('/courses', (req, res) => res.json(courses));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(express.json());
// app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);