const express=require('express');
const app=express();

const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/projectDG",{ useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    if(!err) console.log('db connected');
    else console.log('db error');
});
var db = mongoose.connection;   
//todo lo de arriba es coneccion NO TOCAR (solo si se va a cambiar la base de datos)


    


app.set('view engine', 'ejs')
//res.render(public, locals)
app.use(express.json());
    
// For serving static HTML files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
    



app.get("/", (req, res) => {
res.set({
    "Allow-access-Allow-Origin": "*",
});

return res.redirect("index.html");//primera vista (es el formulario)
});
    


//POST
app.post("/formFillUp", (req, res) => {
var name = req.body.name;
var reason = req.body.reason;
var email = req.body.email;
var phone = req.body.phone;
var city = req.body.city;
var state = req.body.state;
var addressline = req.body.addressline;
    
var data = {
    name: name,
    reason: reason,
    email: email,
    phone: phone,
    city: city,
    state: state,
    addressline: addressline,
};
    
db.collection("users").insertOne(
data, (err, collection) => {
    if (err) {
    throw err;
    }
    console.log("Data inserted successfully!");
});
    
return res.redirect("formSubmitted.html");//pasa a la pagina de verificación 
});
    




//GET 
app.get('/p1', (req, res) => {
    db.collection('users').find().toArray()
      .then(results => {
        res.render('obtenerDatos.ejs', { users: results })
      })
      .catch(/* ... */)

});



 



//para la coneccion
app.listen(5000,()=>{console.log('connection listen on 5000')})