var express = require('express');
var router =  express.Router();
const axios = require('axios');
var uscore = require("underscore");
var files =  require('../common/readfile.js');

router.get('/',function(req,res,next){

    res.render('mtunes',{layout : 'masterLayout'});

});

router.get('/search/:item',function(req,res,next){
    axios.get('https://itunes.apple.com/search?term='+ req.params.item)
    .then(response => {
      req.session.mtunesdata=response.data.results;
      res.send(response.data.results);
    })
    .catch(error => {
      console.log(error);
    });
});
router.get('/favourites',function(req,res,next){
  files.readFile('./data/mtunes.data',function(err,data){
    res.render('mtunes-favourites',{layout:'masterLayout',favitems : data});
  });
//res.json(req.session.mtunesdata);
  //res.render('mtunes-favourites',{layout : 'masterLayout'});
});
router.get('/addfav/:itemId',function(req,res,next){
  const strTrackId = parseInt(req.params.itemId);
  console.log(strTrackId);
  const mtunesdata = req.session.mtunesdata;
  var trackdata = uscore.where(mtunesdata,{trackId:strTrackId})[0];
  console.log(trackdata);
  let favitem= {"username": "arun","favitem": trackdata};
  console.log(favitem);
  files.writeFileMtunes(favitem,'./data/mtunes.data',function(){
      files.readFile('./data/mtunes.data',function(err,data){
    console.log(data);
     res.send({status : 'SUCCESS'});
   // res.render('mtunes-favourites',{layout:'masterLayout',favitems : data});
   });
  });
});
 router.get('/removefav/:itemId',function(req,res,next){
  const strTrackId = parseInt(req.params.itemId);
  console.log('remove fav11');
  files.readFile('./data/mtunes.data',function(err,data){
    console.log(data);
    console.log('remove fav');
     data1 = $.grep(data, function (e) { 
      if(e.favitem.trackId != strTrackId) {
       return true; 
      }
     });
     console.log(data1);
     
     res.send({status : 'SUCCESS'});
   // res.render('mtunes-favourites',{layout:'masterLayout',favitems : data});
   });
  });


module.exports = router;