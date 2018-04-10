var fs = require('fs');
var loginfile = './data/login.data';
var productfile = './data/products.data';
var users = {
  getUsers: function (callback) {
     fs.readFile(loginfile, (err, data) => {  
      if (err)
      {
        callback(err,undefined);
      } 
      callback(undefined,JSON.parse(data));
     });
  },
  checkusername : function(username,callback)
  {
     console.log('inside checkuser');
      users.getUsers(function(err,data)
      {
        console.log('inside read file');
        let userexists = false;
        if(err)
          callback(err,userexists,undefined);
        console.log(data.users);
        userexists =  data.users.filter(function(user){
              return user.username.toLowerCase().indexOf(username) !== -1;
              }).length ? true:false;
        callback(undefined,userexists,data);
      
      });
  },
  saveUsers: function (userdata,cb) {
    users.checkusername(userdata.username,function(err,userexists,data){
      console.log(userexists);
      if (err)
        cb(err,'ERROR');
      else if (userexists)
      {
        cb(err,'EXISTS');
      }
       else {
          data.users.push(userdata);
          fs.writeFile(loginfile,JSON.stringify(data),function(err)
          {
             if (err)
               cb(err,'ERROR');
               
               cb(undefined,'SUCCESS');
          });
        }
    });
  }
};
var products= {
  getTop4Products: function (callback) {
     console.log('getTop4Products');
     fs.readFile(productfile, (err, items) => {  
      if (err)
      {
         console.log(err);
        callback(err,undefined);
      } 
     // console.log(items);
     let top4 =JSON.parse(items).results.sort(function(a, b) { return a.Variable1 < b.Variable1 ? 1 : -1; })
                .slice(0, 4);
      console.log(top4);
      callback(undefined,top4);
     });
  },
};
module.exports = {users : users,products:products};