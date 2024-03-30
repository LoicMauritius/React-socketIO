import express, { json } from 'express';
import { Server } from 'socket.io';
import http from 'http';
import axios from 'axios';

const app = express();
const PORT = 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Autoriser les requêtes depuis n'importe quelle origine
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
});

let messages = [];

// Middleware pour activer CORS (permettre les requêtes depuis n'importe quelle origine)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Middleware pour parser le corps des requêtes JSON
app.use(json());

// Route pour les requêtes POST à l'URL '/'
app.post('/', async (req, res) => {
    try {

    } catch (err) {

    }
});

// Écouter les connexions Socket.IO
io.on('connection', (socket) => {
    console.log('Un client s\'est connecté :', socket.id);

    socket.on('disconnect', () => {
        console.log('Un client s\'est déconnecté :', socket.id);
    });

    //Gestion des messages du webSocket
    socket.on('on-message', (message) => {
        console.log('Message reçu :', message);
        messages.push(message);
        io.emit('response', messages);
    });

    //Gestion des informations du user
    socket.on('getUserData', async (userData) => {
        try {
            // Appel du script PHP pour récupérer les données utilisateur
            const response = await axios.post('php/profile.php', userData);
            // Récupération des données JSON
            const userDataFromPHP = response.data;
            // Envoi des données utilisateur via le socket
            socket.emit('userData', userDataFromPHP);
        } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur depuis PHP :', error);
            // Envoi d'une notification d'erreur à l'utilisateur via le socket
            socket.emit('userDataError', 'Erreur lors de la récupération des données utilisateur');
        }
    });
});

// Démarrer le serveur
server.listen(PORT, () => {
    console.log(`Server is listening at localhost on port ${PORT}`);
});