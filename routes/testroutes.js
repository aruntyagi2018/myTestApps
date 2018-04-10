var express = require('express');
var router = express.Router();
var request = require('request');

var companyInfo = {
   employees : [{ "empId": 1, "name":"Adams","first":"Ansel","profession":"photographer","born" :"SanFrancisco"},
            { "empId": 2,"name":"Muir","first":"John","profession":"naturalist","born":"Scotland"},
            { "empId": 3 , "name":"Schwarzenegger","first":"Arnold","profession":"governator","born":"Germany"},
            { "empId": 4, "name":"Wellens","first":"Paul","profession":"author","born":"Belgium"}
]};
/* GET testroutes listing. */
router.get('/', function(req, res, next) {
  //res.send('test session');
   if ( !req.session.views){
    req.session.views = 1;
    req.session.empData = companyInfo;
  }else{
    req.session.views += 1;
    req.session.empData;
    
  }
//res.send(req.session.empData);
  res.json({
    "status" : "ok",
    "frequency" : req.session.views,
    "EmployeeData": req.session.empData
  });
});
router.get('/test',function(req,res){
  // request.get('http://api.football-data.org/v1/competitions/438/leagueTable',function(error, response, body){
  //  // const data =JSON.parse(body);
  //  // res.json(body);
  //  console.log('error: ',error);
  //  console.log('response: ', response && response.status);
  //  console.log('body : ',body );
  // });
  res.send('send data');
});

module.exports = router;