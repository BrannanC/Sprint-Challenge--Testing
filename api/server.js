const express = require('express');

const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/games', async (req, res) => {
    const games = await Games.getAll();
    res.status(200).json(games);
  });

  
module.exports = server;