const express = require('express');
const { Router } = express;
const proyecto = require('./main.js');


let contenedor = new proyecto.Contenedor("productos.txt");

const PORT = 8080

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
const productos = new Router()

productos.use(express.json())


productos.get('/',async (req, res) => {
    
    res.send(await contenedor.getAll());
})

productos.get('/:id', async (req, res) => { 
    const {id} = req.params;
    res.send(await contenedor.getById(Number(id)));
})

productos.post('/',async(req, res) => {
    res.send(await contenedor.save(req.body));
})


productos.delete('/:id',async(req, res) => {
    const {id} = req.params;
    res.send(await contenedor.deleteById(Number(id)));
})

productos.put('/:id', async (req, res) => {
    const { id } = req.params
    let datos = req.body;
    datos.id=Number(id);
    res.send(await contenedor.putId(id,datos));
})

app.use('/api/productos', productos)

const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto ' + PORT)
})

