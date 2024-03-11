const express =require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname+ "/date.js"); 
const _ = require("lodash");
//console.log(date());

const app=express();

let day=date.getDate();
let onlyday=date.getDay()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolist");

const itemSchema = {
    name: String
     
};

const Item = mongoose.model("Item", itemSchema);
 
var senditems =["buy food","cook food", "make food"];
var workItems=["wake up"];
const item1 = new Item({
    name:"Welcome to your to do list"

});
const item2 = new Item({
    name:"Hit + to add item"

});
const item3 = new Item({
    name:"Hit checkbox to delete an item"

});

const defaultItems = [item1, item2, item3]; 


const listSchema ={
    name: String,
    items: [itemSchema]

};

const List = mongoose.model("List", listSchema);


app.get("/",(req,res)=>{
    // res.send("Hello");
    // res.sendFile(__dirname+"/views/list.ejs")
    // console.log(__dirname+"/views/list.ejs")
    // console.log(date())
    //let day = date();

    Item.find().then(function(result){

    // console.log(result);   
    if (result.length === 0){
        Item.insertMany(defaultItems)
      .then((results) => {
        console.log('Documents inserted successfully:', results);
        res.render("list",{listTitle: "Today", addedItem :results});   
      })
      .catch((error) => {
        console.log('Error inserting documents:', error);
      });    
    }
    else{
        res.render("list",{listTitle: "Today", addedItem :result});

    }      
    }).catch(function(err){
        console.log(err);            
    });        
}); 


app.get("/:customListName", function(req,res){
    const customListName = _.capitalize(req.params.customListName);
    console.log(req.params.customListName);

    (async () => {
        try {
            const result = await List.findOne({ name: customListName });
            if (!result) {
                // console.log("Not Exist");
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/"+ customListName);

            } else {
                 res.render("list", {listTitle: result.name, addedItem :result.items});
            }
        } catch (err) {
            console.error(err);
        }
    })();

    // res.redirect("/"+customListName);
   
    
});


app.post("/",function(req,res){

    const itemName = req.body.additem;
    const listName = req.body.list;
    // console.log(req.body.additem);
    // console.log(req.body.List)
    // var senditem =req.body.additem;
    // res.send("<li>"+senditem+"</li>");
    // if(req.body.List=== "work List"){
    //     workItems.push(senditem);
    //     res.redirect("/work");
    // }
    // else
    // {
    //     senditems.push(senditem);
    //     res.redirect("/");
    // }
    const item = new Item({

        name: itemName
    });
    if (listName === "Today")
    {
        
        item.save();
        res.redirect("/");
    }
    else{
        List.findOne({name: listName}).then(result =>{
            result.items.push(item);
            result.save();
            res.redirect("/"+ listName);
        }).catch(err=>{
            console.log(err);
        })
    }
    
    

});

app.post("/delete", function(req,res){

    // const checkeditemId = req.body.checkbox;
    const listName = req.body.listname;
    // const itemName = req.body.additem;
    // console.log(listName)
    // console.log(req.body.check);
    const checkeditem = req.body.check;
    

    
     
    
    if (listName === "Today")
    {
        Item.findByIdAndDelete(checkeditem).then(deletedDoc =>{
            console.log("deleted Successfully", deletedDoc,checkeditem)
             
        }).catch(err =>{
            console.log(err);
            
        });
        res.redirect("/");
    }
    else{
        List.findOneAndUpdate({name: listName}, {$pull:{items:{_id : checkeditem}}})
    .then(foundList => {
        console.log("Deleted succesfully", foundList);
        res.redirect("/"+ listName);
    })
    .catch(err => {
        // Handle error
        console.error(err);
        // Respond with an error if needed
        res.status(500).send("Internal Server Error");
    });

       
    }
     
});

// app.get("/work",function(req,res){
//     res.render("list",{listTitle: "work List", addedItem: workItems});
// });
// app.post("/work",function(req,res){
//     let senditem=req.body.addedItemIte;
//     workItems.push.apply(senditem);
//     res.redirect("/work");

// });



app.get("/about",function(req,res){
    res.render("about")

})
app.listen(3000, function(){
    console.log("Server is running at 3000")
});