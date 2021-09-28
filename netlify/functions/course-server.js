const express = require("express");
const path = require("path");
const serverless = require('serverless-http');
const app = express();

const router = express.Router();

let courses = require("../models/courses.model.js");

app.use(express.static(path.join(__dirname, "/")));
app.use(express.json());
app.get("/", (req, res) => res.sendFile("../index.html", { root: __dirname }));
app.get("/courses", (req, res) => {
  // will come from db
  res.json(courses);
});

app.post("/new-course", (req, res) => {
  // will come from db
  // console.log('Req: ', req.body);
  courses.push(req.body);
  res.json(courses);
});

app.delete('/deleteCourse/:id', function(req, res) {
  courses = [...courses].filter(c => c.id != req.params.id)
  res.json(courses);
});

app.use('/.netlify/functions/server', router);  // path must route to lambda

app.listen(5000, () => console.log("Server running at 5000 !"));

module.exports = app;
module.exports.handler = serverless(app);
