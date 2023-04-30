const express = require('express');
const app = express();
const port = 8000;



app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);// this is called interpolation 
        //in which we add a variable inside string notations with ${}
    }
    console.log(`Server is running on port : ${port}`);
});