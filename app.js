const express = require('express');
const app = express();

app.use(express.json()); // Permite recibir datos en JSON

let productos = [
    { id: 1, nombre: 'Camisa', precio: 15 },
    { id: 2, nombre: 'Pantalón', precio: 20 },
    { id: 3, nombre: 'Zapatos', precio: 30 }
];

// Endpoint para obtener todos los productos
app.get('/api/productos', (req, res) => {
    res.json(productos);
});

// Endpoint para obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).send('Producto no encontrado');
    res.json(producto);
});

// Endpoint para crear un nuevo producto
app.post('/api/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Endpoint para actualizar un producto
app.put('/api/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).send('Producto no encontrado');

    producto.nombre = req.body.nombre;
    producto.precio = req.body.precio;
    res.json(producto);
});

// Endpoint para eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
    const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (productoIndex === -1) return res.status(404).send('Producto no encontrado');

    const productoEliminado = productos.splice(productoIndex, 1);
    res.json({UserEliminado: productoEliminado[0] });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});