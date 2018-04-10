var express = require('express');
var router = express.Router();
var uscore = require("underscore");

/* GET home page. */
var companyInfo = {
   employees : [{ "empId": 1, "name":"Adams","first":"Ansel","profession":"photographer","born" :"SanFrancisco"},
            { "empId": 2,"name":"Muir","first":"John","profession":"naturalist","born":"Scotland"},
            { "empId": 3 , "name":"Schwarzenegger","first":"Arnold","profession":"governator","born":"Germany"},
            { "empId": 4, "name":"Wellens","first":"Paul","profession":"author","born":"Belgium"}
]};
router.get('/', function(req, res, next) {
  res.render('index', companyInfo);
  //res.render('index', { title: 'Express' });
});
router.get('/empDetail/:empId', function(req, res, next) {
// var comInfo = JSON.parse(companyInfo);
//console.log(comInfo);
var id = parseInt(req.params.empId);
var empdetails = uscore.where(companyInfo.employees, {empId: id})[0];
  res.render('empDetail',empdetails);
 // res.send(req.params.empId)
  //res.send(empdetails)
});
router.get('/create', function(req, res, next) {
 res.render('create');
});
router.post('/save', function(req, res, next) {
 // res.setHeader('Content-Type', 'application/json');
 // console.log('save route');
 //console.log(req.body);
 var empdata=req.body;
 empdata.empId=companyInfo.employees.length +1;
 empdata.born="new delhi";
 companyInfo.employees.push(empdata);
 res.render('index', companyInfo);
 //res.send(companyInfo.employees);
});
module.exports = router;
