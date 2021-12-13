const express=require('express');
const app=express();

const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/Panificadora",{ useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
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

//POST
app.post("/agregarCliente", (req, res) => {
    var nombres_c = req.body.nombre_cliente;
    var apellidos_c = req.body.apellido_cliente;
    var numero_c = req.body.numero_cliente;

    var data = {
        nombre_cliente: nombres_c,
        apellidos_cliente: apellidos_c,
        numero_cliente: numero_c,
    };
        
    db.collection("Clientes").insertOne(
    data, (err, collection) => {
        if (err) {
        throw err;
        }
        console.log("Data inserted successfully!");
    });
        
    return res.redirect("/");
});
    
app.post("/agregarPan", (req, res) => {
    var nombre_p = req.body.nombre_pan;
    var proveedor_p = req.body.proveedor_pan;
    var origen_p = req.body.origen_pan;

    var data = {
        nombre_pan: nombre_p,
        proveedor_pan: proveedor_p,
        origen_pan: origen_p,
    };
        
    db.collection("Tipos").insertOne(
    data, (err, collection) => {
        if (err) {
        throw err;
        }
        console.log("Data inserted successfully!");
    });
        
    return res.redirect("/");
});

app.post("/agregarPedido", (req, res) => {
    var cliente_p = req.body.nombre_cliente;
    var nombre_p = req.body.nombre_pan;
    var cantidad_p = req.body.cantidad_pan;

    var data = {
        nombre_cliente: cliente_p,
        nombre_pan: nombre_p,
        cantidad_pan: cantidad_p,
    };
        
    db.collection("Transacciones").insertOne(
    data, (err, collection) => {
        if (err) {
        throw err;
        }
        console.log("Data inserted successfully!");
    });
        
    return res.redirect("/");
});


app.get('/', (req, res) => {
    var clientes;
    var tipos;
    var transacciones;
    res.set({
        "Allow-access-Allow-Origin": "*",
    });
    db.collection('Clientes').find().toArray()
      .then(results => {
        clientes = results;
      })
      .catch(/* ...  */);
    db.collection('Tipos').find().toArray()
      .then(results => {
        tipos = results;
      })
      .catch(/* ... */);
    db.collection('Transacciones').find().toArray()
      .then(results => {
        transacciones = results;
        res.render('index.ejs', { clientes, tipos, transacciones })
      })
      .catch(/* ... */);
});

//para la coneccion
app.listen(5000,()=>{console.log('connection listen on 5000')})