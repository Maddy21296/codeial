module.exports.home = function(req,res){
    console.log(req.cookies); // this is used for requesting cookie value which is created in browser
    res.cookie('user-id', 9494);// this is used for change cookie value which is created in browser
    return res.render('home',{
        title : "Home"
    });
}

module.exports.partytime = function(req,res){
    return res.end('<h1>Party time is 9PM </h1>');
}