const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

let orderId = 1; // Inicializa el ID del pedido

// Middleware para parsear el body del POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para servir tu página HTML
app.use(express.static('public')); // Asume que el HTML está en la carpeta 'public'

// Ruta para recibir y procesar el pedido
app.post('/finalizarOrden', (req, res) => {
    const { hamburguesa, adicion, bebida, mensaje } = req.body;

    const order = {
        id: orderId,
        hamburguesa,
        adicion,
        bebida,
        mensaje,
        fecha: new Date().toLocaleString()
    };

    // Escribe el pedido en un archivo de texto
    fs.appendFile('pedidos.txt', JSON.stringify(order) + '\n', (err) => {
        if (err) {
            return res.status(500).send('Error guardando el pedido');
        }
        res.json({ message: 'Pedido recibido', orderId: orderId });
    });

    // Incrementa el ID para el siguiente pedido
    orderId++;
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
