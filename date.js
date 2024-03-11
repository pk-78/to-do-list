//var today= new Date();
// var day="";
 
// if (today.getDay()===6) {
// //     res.write("<h2>Wooo! its the weekend</h2>");
// //     res.write("<p> Today is "+today+"</p>");
// //     res.send();
// day= "Saturday :)";

// }
// else if(today.getDay()===5){
//     day= "Friday :)";
// }
// else if(today.getDay()===4){
//     day= "Thursday :)";
// }
// else if(today.getDay()===3){
//     day= "Wednesday :)";
// }
// else if(today.getDay()===2){
//     day= "Tuesday :)";
// }
// else if(today.getDay()===1){ 
//     day= "Monday :)";
// }
// else {
//     // res.write("<h1>Its a working day </h1>");
//     // res.write("<p>Today is "+today+"</p>");
//     // res.send();
//     // res.sendFile(__dirname+"/index.html")
//     day="Sunday :)"
// }


// another method  

//console.log(module);

//module.exports="Hello World";
//module.exports.getDate = getDate

// function getDate(){
exports.getDate=function(){    
    var today= new Date();
    var options = {
        weekday: "long",
        day:"numeric",
        month:"long"

    };

var day = today.toLocaleDateString("en-US",options); 

return day;
}


//module.exports.getDay=getDay

//function getDay(){
exports.getDay=function(){
    var today= new Date();
    var options = {
        weekday: "long",
        

    };

var day = today.toLocaleDateString("en-US",options); 

return day;
}