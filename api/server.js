const express = require('express');

const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/games', async (req, res) => {
    const games = await Games.getAll();
    res.status(200).json(games);
});

server.post('/games', (req, res) => {
    const game = req.body;
    if(!game.title || !game.genre){
        res.status(422).json({ error: 'Title and genre required'})
    } else {
        Games.insert(game)
            .then(game => {
                res.status(201).json({ game })
            })
            .catch(err => {
                err.errno === 19 ?
                res.status(405).json({ error: 'Duplicate game'})
                : res.status(500).json({ error: 'Could not add game', err })
            })
    }
});

server.delete('/games/:id', async (req, res) => {
    Games.remove(req.params.id)
        .then(isDel => {
            isDel ?
            res.status(204).end()
            : res.status(404).json({ error: 'Game with that ID does not exist' })
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not remove game' })
        });
});
  
module.exports = server;