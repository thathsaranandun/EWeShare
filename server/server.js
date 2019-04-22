const express = require('express')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

  //GET request
  app.route('/api/users/:name').get((req, res) => {
    const requestedUserName = req.params['name']
    res.send({ name: requestedUserName })
    console.log(requestedUserName)
  })
  
  app.use(express.json());

  //POST Test request
  app.post('/api/user', function(request, response){
  const requestedUser = request.body
  console.log(requestedUser.name);    
  
  response.send(request.body);    
  });

  app.post('/api/userlogin', function(request, response){
    const requestedUser = request.body
    console.log(requestedUser.name);  
    console.log(requestedUser.password);
    username=requestedUser.name;
    password=requestedUser.password;

    var dbdata = false;
    let mysql = require('mysql');
    let config = require('./config.js');
    
    let connection = mysql.createConnection(config);
    
    let sql = "SELECT username,password FROM users WHERE username='"+username+"'";
    connection.query(sql, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }else{
        console.log('>> results: ', results );
        var string=JSON.stringify(results);
        console.log('>> string: ', string );
        var json =  JSON.parse(string);
        console.log('>> json: ', json);
        if(json[0]==null){
          console.log('Invalid Username');
          response.send(dbdata);
        }else{

        console.log('>> user.name: ', json[0].username);
        console.log('>> user.password: ', json[0].password);
        if(json[0].password==password){
          console.log('correct password');
          dbdata=true;
          response.send(dbdata);
        }else{
          console.log('Incorrect password');
          dbdata=false;
          response.send(dbdata);
        }
      
      }
    }
    connection.end();
    
    });
    
        
  });

  //POST Sign up request
  app.post('/api/newuser', function(request, response){
    const requestedUser = request.body
    console.log(requestedUser.fname);
    console.log(requestedUser.lname);
    console.log(requestedUser.username);
    console.log(requestedUser.email);
    console.log(requestedUser.address);
    console.log(requestedUser.password);
    const fname = requestedUser.fname;
    const lname = requestedUser.lname;
    const address = requestedUser.address;
    const username = requestedUser.username;
    const email = requestedUser.email;
    const password = requestedUser.password;





    let mysql = require('mysql');
    let config = require('./config.js');
    let connection = mysql.createConnection(config);
 
    let stmt = "INSERT INTO users(userFName,userLName,email,username,address,password) VALUES ('"+fname+"','"+lname+"','"+email+"','"+username+"','"+address+"','"+password+"')";
            
    let todo = ['Insert a new row with placeholders', false];
 
    // execute the insert statment
    connection.query(stmt, todo, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }

    });


    connection.end();
    response.send(request.body);    
  });
  
  


const port = process.env.PORT || 3000 ;

app.listen(port,() => console.log(`Listening on port ${port} ....`));
