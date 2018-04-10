var express = require('express');
var router = express.Router();
var files =  require('../common/lib.js');

router.get('/list',function(req,res){
   files.getTop4Products(function(err,top4products){
        if(err)
            res.json({status:'ERROR',message:'error while retrieving top 4 products'}); 
        
        res.json(top4products);
    });
});

module.exports = router;