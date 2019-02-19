const Joi= require('joi');
const express = require('express');
const app =express();

app.use(express.json());




const courses = [

    {id :1,name:'course1'},
    {id :2,name:'course2'},
    {id :3,name:'course3'},
    
    
];


// const customer = [
//     {id :1, name:'course1' ,email:'sd@gmail.com' ,address:'sddfsfds',username:'abcdefg'},
// ];





app.get('/',(req,res) => {
    res.send('Hello World!!!!')
});






app.get('/api/courses',(req, res)=>{

    res.send(courses);

} );  





app.post('/api/courses', (req, res) => {

    const { error } =validateCourse(req.body);  //result.error

    

    if(error)
        // 400 bad request
       return  res.status(400).send(result.details[0].message);
       
    
    
 const course ={
      id:courses.length+1,
      name:req.body.name
    //email:req.body.email
    //address:req.body.address
    //username:req.body.username
 };

 courses.push(course);
 res.send(course);
});








app.get('/api/courses/:id', (req, res)=> {

    const course = courses.find(c =>c.id === parseInt(req.params.id));
     if(!course) return  res.status(404).send('The course with the given ID was not found.');//404
      res.send(course);

    });







app.get('/api/posts/:year/:month',(req,res) =>{

    res.send(req.query);
});






app.put('/api/courses/:id', (req,res) =>{
 
    //Look up the course
    //If not existing ,return 404

    const course = courses.find(c =>c.id === parseInt(req.params.id));
     if(!course)
        return   res.status(404).send('The course with the given ID was not found.') //404
        

    const result =validateCourse(req.body);
    const { error } =validateCourse(req.body);  //result.error

    

    if(error)
        // 400 bad request
       return   res.status(400).send(result.details[0].message);
    


    
    //Update course
    course.name=req.body.name;

    res.send(course);

    //Return the updated course


});



function validateCourse(course) {

    const schema = {

        name: Joi.string().min(3).required()

    };

    return Joi.validate(course,schema);

}





app.delete('/api/courses/:id', (req,res) => {

    const course = courses.find(c =>c.id === parseInt(req.params.id));
    if(!course)  return res.status(404).send('The course with the given ID was not found.'); //404



    const index =courses.indexOf(course);
    courses.splice(index,1);


    res.send(course);

});



const port = process.env.PORT || 3000 ;

app.listen(port,() => console.log(`Listening on port ${port} ....`));
